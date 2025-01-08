from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)

model = tf.keras.models.load_model('model/mnist_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    try:
        image = Image.open(file).convert('L').resize((28, 28))  
        image_array = np.array(image) / 255.0  
        image_array = np.expand_dims(image_array, axis=0)  

        prediction = model.predict(image_array)
        predicted_class = np.argmax(prediction, axis=1)[0]

        return jsonify({'diagnosis': int(predicted_class)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
