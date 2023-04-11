# Installation Guide
This guide will help you install and run the different components of the project. The project has three parts: API, ML-API, and ML-Training.

## API
### Prerequisites
- Node.js version 16 or higher

### Steps
1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the API directory:

```bash
cd api
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run start
```

## ML-API
### Prerequisites
- Docker
### Steps
1. Clone the repository:

```bash
git clone <repository-url>
```
2. Navigate to the ML-API directory:

```bash
cd ml-api
```
3. Build the Docker image:
```bash
docker build -t ml-api .
```
4. Run the Docker container:
```bash
docker run -p 5000:5000 ml-api
```
## ML-Training
### Prerequisites
- Python 3.7 or higher
### Steps
1. Clone the repository:
```bash
git clone <repository-url>
```
2. Navigate to the ML-Training directory:
```bash
cd ml-training
```
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Start the training process:
```bash
python train.py
```
## Conclusion
You have successfully installed and run the different components of the project. If you face any issues, please refer to the project's documentation or contact the project team for support.