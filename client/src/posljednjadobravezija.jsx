
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, etc.)');
      setFile(null);
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.diagnosis);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult('');
      setError('Error processing the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="app-header">
        <h1>Welcome to the Diagnosis App</h1>
        <p>Upload your CT scans and get an instant diagnosis.</p>
      </header>
      <div className="app-container">
        <div className="content">
          <h1 className="title">CT Image Diagnosis</h1>
          <p className="description">
            Upload a CT image to detect potential kidney-related conditions.
          </p>
          {error && <div className="error">{error}</div>}
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
          <button className="upload-button" onClick={handleUpload} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Upload and Predict'}
          </button>
          {result && <h2 className="result">Diagnosis: {result}</h2>}
        </div>
      </div>
    </>
  );
}

export default App;