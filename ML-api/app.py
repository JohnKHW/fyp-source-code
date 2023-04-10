from flask import Flask, request
from tensorflow import keras
from keras.models import Sequential
from keras.models import model_from_json
from werkzeug.utils import secure_filename
from uuid import uuid4
from fer import FER
import os
import cv2
import numpy as np

current_dir = os.path.abspath(os.path.dirname(__file__))
storage_dir = os.path.join(current_dir, 'storage')
model_dir = os.path.join(storage_dir, 'models', 'model_1')
print(f'model_dir: {model_dir}')
json_file = open(os.path.join(model_dir, 'model.json'), 'r')
loaded_model_json = json_file.read()
json_file.close()
model: Sequential = model_from_json(loaded_model_json)
model.load_weights(os.path.join(model_dir, 'model_weight.h5'))   

# config of ml
emo_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']
num_class = len(emo_labels)

cascade_path = os.path.join(storage_dir, 'haarcascade_frontalface_alt.xml')
cascade = cv2.CascadeClassifier(cascade_path)
img_size = 48
def update_model():
    pass

def loading_face(img_path):
    frame = cv2.imread(os.path.join(app.config['UPLOAD_FOLDER'], img_path))

    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faceRects = cascade.detectMultiScale(frame_gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    results = []
    if len(faceRects) > 0:
        for faceRect in faceRects:
            x, y, w, h = faceRect
            images = []
            rs_sum = np.array([0.0] * num_class)
            image = frame_gray[y: y + h, x: x + w] 
            image = cv2.resize(image, (img_size, img_size))
            image = image * (1. / 255)
            display = image.astype('float32')
            images.append(image)  # 在末尾添加新的图片
            images.append(cv2.flip(image, 1))
            images.append(cv2.resize(image[2:45, :], (img_size, img_size)))
            for img in images:
                image = img.reshape(1, img_size, img_size, 1)
                list_of_list = model.predict(image, batch_size=32, verbose=0)  # predict
                result = [prob for lst in list_of_list for prob in lst]
                rs_sum += np.array(result)
            label = np.argmax(rs_sum)
            emo = emo_labels[label]
            results.append({
                'x': int(x),
                'y': int(y),
                'w': int(w),
                'h': int(h),
                'expression': emo
            })
            # results.append(emo)
    return results

app = Flask(__name__)
app.config.from_object('config')

@app.route("/expression", methods=['POST']) 
def expression():
    if 'selfie' not in request.files:
        return 'No selfie uploaded'
    selfie = request.files['selfie']
    
    filename = secure_filename(str(uuid4())) + '.png'
    
    selfie.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # predict expression
    expression = loading_face(filename)

    return {'filename': filename, 'expression': expression}

@app.route("/expression/correct/<string:img_name>", methods=['PUT']) 
def expression_correct(img_name):
    expression = request.values.get("expression")
    # find expression by emo_labels and get index
    expression = emo_labels.index(expression) 
    
    h = request.values.get("h")
    w = request.values.get("w")
    x = request.values.get("x")
    y = request.values.get("y")
    # print(f'expression: {expression}, h: {h}, w: {w}, x: {x}, y: {y}')
    
    frame = cv2.imread(os.path.join(app.config['UPLOAD_FOLDER'], img_name))
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    frame_gray = frame_gray[int(y):int(y)+int(h), int(x):int(x)+int(w)]
    
    # frame_gray = frame_gray[y:y+h, x:x+w]
    image = cv2.resize(frame_gray, (img_size, img_size))
    image = image * (1. / 255)
    image = image.reshape(1, img_size, img_size, 1)
    fer = FER()
    fer.fit_model(np.array([image]), np.array([expression]))

    return {}

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run()