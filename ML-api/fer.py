
from tensorflow import keras
from keras.models import Sequential, load_model
from keras.layers import Dense, Conv2D, Flatten, MaxPooling2D, Dropout, Activation, BatchNormalization
import tensorflow as tf
import os

class FER:
    # def build_model(self):
    #     gpus = tf.config.list_physical_devices('GPU')
    #     with tf.device("/gpu:0"):
    #         self.model = Sequential()
    #         self.model.add(Conv2D(32, (3,3), activation='relu', input_shape=(48, 48, 1)))
    #         self.model.add(MaxPooling2D((2, 2)))
    #         self.model.add(Conv2D(64, (3,3), activation='relu'))
    #         self.model.add(MaxPooling2D((2, 2)))
    #         self.model.add(Flatten())
    #         self.model.add(Dense(128, activation='relu'))
    #         self.model.add(Dense(7, activation='softmax'))

    def fit_model(self, input, label):
        
        current_dir = os.path.abspath(os.path.dirname(__file__))
        storage_dir = os.path.join(current_dir, 'storage')
        model_dir = os.path.join(storage_dir, 'models', 'model_1')
        self.model = Sequential()
        self.model = load_model(os.path.join(model_dir, 'model.h5'))
        # print(input.shape)
        # print(label.shape)
        self.model.fit(input, label, epochs=500, batch_size=64, verbose=1)
        self.model.save_weights(os.path.join(model_dir, 'model_weight2.h5'))
