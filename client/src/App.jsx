import { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';
import ContentHeader from './components/ContentHeader/ContentHeader';
import ResultsSlider from './components/ResultsSlider/ResultsSlider';
import ErrorMessage from './components/Error/ErrorMessage';
import FileInput from './components/FileInput/FileInput';

const App = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
      };
      reader.readAsDataURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 300;
        const maxHeight = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          resolve(resizedFile);
        }, file.type);
      };
    });
  };

  const handleFileChange = (e) => {
    console.log('tu');
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => file.type.startsWith('image/'));
    if (validFiles.length !== selectedFiles.length) {
      setError('Some files are not valid images (JPG, PNG, etc.). Only valid images will be processed.');
    } else {
      setError('');
    }
    setFiles(validFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('No files selected');
      return;
    }

    setIsLoading(true);
    setResults([]);
    const uploadPromises = files.map(async (file) => {
      const resizedFile = await resizeImage(file);
      const formData = new FormData();
      formData.append('file', resizedFile);

      try {
        const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return { file: resizedFile, diagnosis: response.data.diagnosis };
      } catch (error) {
        console.error('Error uploading file:', error);
        return { file: resizedFile, diagnosis: 'Error processing the image' };
      }
    });

    const responses = await Promise.all(uploadPromises);
    setResults(responses);
    setIsLoading(false);
    setIsUploaded(true);
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
    setError('');
    setIsUploaded(false);
  };


  return (
    <div className="app">
      <Header />
      {/* <MainContent
        files={files}
        results={results}
        error={error}
        isLoading={isLoading}
        isUploaded={isUploaded}
        onFileChange={handleFileChange}
        onUpload={handleUpload}
        onReset={handleReset}
      /> */}
      <main className="main">
        <div className="main-container">
          <div className="app-container">
            <div className="content">
              <ContentHeader />
              {error && <ErrorMessage message={error} />}
              {!isUploaded && (
                <>
                  <FileInput files={files} handleFileChange={handleFileChange} />
                  {/* <label htmlFor="file-upload" className="file-label">
                    Choose Files
                  </label>
                  <input
                    id='file-upload'
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                    multiple
                  />
                  {files.length > 0 && (
                    <p className="file-count">
                      {files.length} file{files.length > 1 ? 's' : ''} selected
                    </p>
                  )} */}
                  {files.length > 0 &&
                    <Button
                      className="upload-button"
                      onClick={handleUpload}
                      text={isLoading ? 'Processing...' : 'Upload and Predict'} />
                    // <button className='upload-button'
                    //   onClick={handleUpload} >
                    //   {isLoading ? 'Processing...' : 'Upload and Predict'}
                    // </button>
                  }
                </>
              )}
              {isUploaded && (
                <Button
                  text="Reset Images"
                  className="reset-button"
                  onClick={handleReset}
                />
                // <button className="reset-button" onClick={handleReset}>
                //   Reset Images
                // </button>
              )}
            </div>
          </div>

          {results.length > 0 && (
            <ResultsSlider results={results} />
          )}
        </div>
      </main >
      <Footer />
    </div >
  );
};

export default App;



// const handleUpload = async () => {
//   if (!file) {
//     alert('Please upload a CT scan before submitting.');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', file);

//   setLoading(true);
//   try {
//     const response = await fetch('/api/analyze', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Error analyzing the file');
//     }

//     const result = await response.json();
//     setAnalysisResult(result);
//   } catch (error) {
//       console.log(error);
//     alert('Failed to analyze the scan. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//  Upload your CT scans and access cutting-edge insights for optimal care.

{/* <div className="upload-section">
          <input type="file" accept="image/*, .dcm" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={loading}>
            {loading ? 'Analyzing...' : 'Upload and Analyze'}
          </button>
        </div>

        {analysisResult && (
          <div className="results">
            <h2>Analysis Results</h2>
            <p><strong>Diagnosis:</strong> {analysisResult.diagnosis}</p>
            <p><strong>Confidence:</strong> {analysisResult.confidence}%</p>

            <div className="segmented-image">
              <h3>Segmented Image</h3>
              <img src={analysisResult.segmentedImageUrl} alt="Segmented CT" />
            </div>

            <p className="recommendation">
              <strong>Recommendation:</strong> {analysisResult.recommendation}
            </p>
          </div>
        )} */}