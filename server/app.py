import os
import tensorflow as tf
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing import image
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

model = tf.keras.models.load_model('model/trained_model_v2.h5')  

class_map = {'Normal': 0, 'Cyst': 1, 'Stone': 2, 'Tumor': 3}
class_names = list(class_map.keys())

def prepare_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))  
    img_array = image.img_to_array(img)  
    img_array = np.expand_dims(img_array, axis=0)  
    # img_array = img_array / 255.0  
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    print("emin")
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img_path = os.path.join('temp_image.jpg')  
        file.save(img_path)

        img_array = prepare_image(img_path)

        predictions = model.predict(img_array)
        print(f"Predictions: {predictions}") 
        predicted_class = np.argmax(predictions, axis=1)[0]  
        predicted_label = class_names[predicted_class]  
        confidence = predictions[0][predicted_class]  

        return jsonify({
            'predicted_class': predicted_label,
            'confidence': float(confidence)  
        })
    
    except Exception as e:
        print(f"Error: {str(e)}")  
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)
