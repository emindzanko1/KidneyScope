// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleFileChange = e => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile && !selectedFile.type.startsWith('image/')) {
//             setError('Please select a valid image file (JPG, PNG, etc.)');
//             setFile(null);
//         } else {
//             setError('');
//             setFile(selectedFile);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             setError('No file selected');
//             return;
//         }

//         setIsLoading(true);
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('');
//             setError('Error processing the image');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="app-container">
//             <div className="content">
//                 <h1 className="title">CT Image Diagnosis</h1>
//                 <p className="description">
//                     Upload a CT image to detect potential kidney-related conditions.
//                 </p>
//                 {error && <div className="error">{error}</div>}
//                 <input
//                     type="file"
//                     className="file-input"
//                     onChange={handleFileChange}
//                 />
//                 <button className="upload-button" onClick={handleUpload} disabled={isLoading}>
//                     {isLoading ? 'Processing...' : 'Upload and Predict'}
//                 </button>
//                 {result && <h2 className="result">Diagnosis: {result}</h2>}
//             </div>
//         </div>
//     );
// }

// export default App;


// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');

//     const handleFileChange = e => setFile(e.target.files[0]);

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('Error processing the image');
//         }
//     };

//     return (
//         <div className="app-container">
//             <div className="content">
//                 <h1 className="title">CT Image Diagnosis</h1>
//                 <input
//                     type="file"
//                     className="file-input"
//                     onChange={handleFileChange}
//                 />
//                 <button className="upload-button" onClick={handleUpload}>
//                     Upload and Predict
//                 </button>
//                 {result && <h2 className="result">Diagnosis: {result}</h2>}
//             </div>
//         </div>
//     );
// }

// export default App;


// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleFileChange = e => setFile(Array.from(e.target.files));

//     const handleUpload = async () => {
//         if (!file || file.length === 0) return alert('Please upload at least one image');
//         setLoading(true);
//         const formData = new FormData();
    
//         file.forEach((f, index) => formData.append(`file_${index}`, f));
    
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log(response);
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('Error processing the images');
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <>
//             <div className="app-container">
//                 <div className="content">
//                     <h1 className="title">CT Image Diagnosis</h1>
//                     <p className="subtitle">Upload a CT image of the kidney to diagnose the condition (Tumor, Cyst, Stone, Normal).</p>
//                     <div className="upload-section">
//                         <label
//                             htmlFor="file-upload"
//                             className="file-input">
//                             Upload Image
//                         </label>
//                         <input
//                             id="file-upload"
//                             type="file"
//                             onChange={handleFileChange}
//                         />
//                         <button className="upload-button" onClick={handleUpload} disabled={loading}>
//                             {loading ? 'Processing...' : 'Upload and Predict'}
//                         </button>
//                     </div>
//                     {loading && <div className="loading">Analyzing...</div>}
//                     {result && <h2 className="result">Diagnosis: {result}</h2>}
//                     <div className="footer">
//                         <p>Powered by AI for Kidney Disease Diagnosis</p>
//                     </div>
//                 </div>
//                 {file && <div className="content">
//                     <h1 className="title">CT Image Diagnosis</h1>
//                     <p className="subtitle">Upload a CT image of the kidney to diagnose the condition (Tumor, Cyst, Stone, Normal).</p>
//                     <div className="upload-section">
//                         <label
//                             htmlFor="file-upload"
//                             className="file-input"
//                             multiple>
//                             Upload Image
//                         </label>
//                         <input
//                             id="file-upload"
//                             type="file"
//                             onChange={handleFileChange}
//                             multiple
//                         />
//                         <button className="upload-button" onClick={handleUpload} disabled={loading}>
//                             {loading ? 'Processing...' : 'Upload and Predict'}
//                         </button>
//                     </div>
//                     {loading && <div className="loading">Analyzing...</div>}
//                     {result && Array.isArray(result) && (
//                         <div className="results">
//                             {result.map((res, index) => (
//                                 <h2 key={index} className="result">Diagnosis for file {index + 1}: {res}</h2>
//                             ))}
//                         </div>
//                     )}
//                 </div>}
//             </div>
//         </>
//     );
// }

// export default App;

// import React, { useState } from 'react';
// import './App.css';

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please upload a CT scan before submitting.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setLoading(true);
//     try {
//       const response = await fetch('/api/analyze', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Error analyzing the file');
//       }

//       const result = await response.json();
//       setAnalysisResult(result);
//     } catch (error) {
//       alert('Failed to analyze the scan. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>BioScan</h1>
//         <p>Upload your CT scan and receive detailed kidney health analysis.</p>
//       </header>
//       <main className="main">
//         <div className="upload-section">
//           <input type="file" accept="image/*, .dcm" onChange={handleFileChange} />
//           <button onClick={handleUpload} disabled={loading}>
//             {loading ? 'Analyzing...' : 'Upload and Analyze'}
//           </button>
//         </div>

//         {analysisResult && (
//           <div className="results">
//             <h2>Analysis Results</h2>
//             <p><strong>Diagnosis:</strong> {analysisResult.diagnosis}</p>
//             <p><strong>Confidence:</strong> {analysisResult.confidence}%</p>

//             <div className="segmented-image">
//               <h3>Segmented Image</h3>
//               <img src={analysisResult.segmentedImageUrl} alt="Segmented CT" />
//             </div>

//             <p className="recommendation">
//               <strong>Recommendation:</strong> {analysisResult.recommendation}
//             </p>
//           </div>
//         )}
//       </main>
//       <footer className="footer">
//         <p>© 2024 BioScan. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default App;

// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleFileChange = e => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile && !selectedFile.type.startsWith('image/')) {
//             setError('Please select a valid image file (JPG, PNG, etc.)');
//             setFile(null);
//         } else {
//             setError('');
//             setFile(selectedFile);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             setError('No file selected');
//             return;
//         }

//         setIsLoading(true);
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('');
//             setError('Error processing the image');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="app-container">
//             <div className="content">
//                 <h1 className="title">CT Image Diagnosis</h1>
//                 <p className="description">
//                     Upload a CT image to detect potential kidney-related conditions.
//                 </p>
//                 {error && <div className="error">{error}</div>}
//                 <input
//                     type="file"
//                     className="file-input"
//                     onChange={handleFileChange}
//                 />
//                 <button className="upload-button" onClick={handleUpload} disabled={isLoading}>
//                     {isLoading ? 'Processing...' : 'Upload and Predict'}
//                 </button>
//                 {result && <h2 className="result">Diagnosis: {result}</h2>}
//             </div>
//         </div>
//     );
// }

// export default App;


// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');

//     const handleFileChange = e => setFile(e.target.files[0]);

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('Error processing the image');
//         }
//     };

//     return (
//         <div className="app-container">
//             <div className="content">
//                 <h1 className="title">CT Image Diagnosis</h1>
//                 <input
//                     type="file"
//                     className="file-input"
//                     onChange={handleFileChange}
//                 />
//                 <button className="upload-button" onClick={handleUpload}>
//                     Upload and Predict
//                 </button>
//                 {result && <h2 className="result">Diagnosis: {result}</h2>}
//             </div>
//         </div>
//     );
// }

// export default App;


// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleFileChange = e => setFile(Array.from(e.target.files));

//     const handleUpload = async () => {
//         if (!file || file.length === 0) return alert('Please upload at least one image');
//         setLoading(true);
//         const formData = new FormData();
    
//         file.forEach((f, index) => formData.append(`file_${index}`, f));
    
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log(response);
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('Error processing the images');
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <>
//             <div className="app-container">
//                 <div className="content">
//                     <h1 className="title">CT Image Diagnosis</h1>
//                     <p className="subtitle">Upload a CT image of the kidney to diagnose the condition (Tumor, Cyst, Stone, Normal).</p>
//                     <div className="upload-section">
//                         <label
//                             htmlFor="file-upload"
//                             className="file-input">
//                             Upload Image
//                         </label>
//                         <input
//                             id="file-upload"
//                             type="file"
//                             onChange={handleFileChange}
//                         />
//                         <button className="upload-button" onClick={handleUpload} disabled={loading}>
//                             {loading ? 'Processing...' : 'Upload and Predict'}
//                         </button>
//                     </div>
//                     {loading && <div className="loading">Analyzing...</div>}
//                     {result && <h2 className="result">Diagnosis: {result}</h2>}
//                     <div className="footer">
//                         <p>Powered by AI for Kidney Disease Diagnosis</p>
//                     </div>
//                 </div>
//                 {file && <div className="content">
//                     <h1 className="title">CT Image Diagnosis</h1>
//                     <p className="subtitle">Upload a CT image of the kidney to diagnose the condition (Tumor, Cyst, Stone, Normal).</p>
//                     <div className="upload-section">
//                         <label
//                             htmlFor="file-upload"
//                             className="file-input"
//                             multiple>
//                             Upload Image
//                         </label>
//                         <input
//                             id="file-upload"
//                             type="file"
//                             onChange={handleFileChange}
//                             multiple
//                         />
//                         <button className="upload-button" onClick={handleUpload} disabled={loading}>
//                             {loading ? 'Processing...' : 'Upload and Predict'}
//                         </button>
//                     </div>
//                     {loading && <div className="loading">Analyzing...</div>}
//                     {result && Array.isArray(result) && (
//                         <div className="results">
//                             {result.map((res, index) => (
//                                 <h2 key={index} className="result">Diagnosis for file {index + 1}: {res}</h2>
//                             ))}
//                         </div>
//                     )}
//                 </div>}
//             </div>
//         </>
//     );
// }

// export default App;

// import React, { useState } from 'react';
// import './App.css';

// const App = () => {
//   const [file, setFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please upload a CT scan before submitting.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setLoading(true);
//     try {
//       const response = await fetch('/api/analyze', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Error analyzing the file');
//       }

//       const result = await response.json();
//       setAnalysisResult(result);
//     } catch (error) {
//       alert('Failed to analyze the scan. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>BioScan</h1>
//         <p>Upload your CT scan and receive detailed kidney health analysis.</p>
//       </header>
//       <main className="main">
//         <div className="upload-section">
//           <input type="file" accept="image/*, .dcm" onChange={handleFileChange} />
//           <button onClick={handleUpload} disabled={loading}>
//             {loading ? 'Analyzing...' : 'Upload and Analyze'}
//           </button>
//         </div>

//         {analysisResult && (
//           <div className="results">
//             <h2>Analysis Results</h2>
//             <p><strong>Diagnosis:</strong> {analysisResult.diagnosis}</p>
//             <p><strong>Confidence:</strong> {analysisResult.confidence}%</p>

//             <div className="segmented-image">
//               <h3>Segmented Image</h3>
//               <img src={analysisResult.segmentedImageUrl} alt="Segmented CT" />
//             </div>

//             <p className="recommendation">
//               <strong>Recommendation:</strong> {analysisResult.recommendation}
//             </p>
//           </div>
//         )}
//       </main>
//       <footer className="footer">
//         <p>© 2024 BioScan. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default App;




// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');

//     const handleFileChange = e => setFile(e.target.files[0]);

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('Error processing the image');
//         }
//     };

//     return (
//         <div className="app-container">
//             <div className="content">
//                 <h1 className="title">CT Image Diagnosis</h1>
//                 <input
//                     type="file"
//                     className="file-input"
//                     onChange={handleFileChange}
//                 />
//                 <button className="upload-button" onClick={handleUpload}>
//                     Upload and Predict
//                 </button>
//                 {result && <h2 className="result">Diagnosis: {result}</h2>}
//             </div>
//         </div>
//     );
// }

// export default App;


// import { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//     const [file, setFile] = useState(null);
//     const [result, setResult] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleFileChange = e => setFile(Array.from(e.target.files));

//     const handleUpload = async () => {
//         if (!file || file.length === 0) return alert('Please upload at least one image');
//         setLoading(true);
//         const formData = new FormData();
    
//         file.forEach((f, index) => formData.append(`file_${index}`, f));
    
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log(response);
//             setResult(response.data.diagnosis);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//             setResult('Error processing the images');
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <>
//             <div className="app-container">
//                 <div className="content">
//                     <h1 className="title">CT Image Diagnosis</h1>
//                     <p className="subtitle">Upload a CT image of the kidney to diagnose the condition (Tumor, Cyst, Stone, Normal).</p>
//                     <div className="upload-section">
//                         <label
//                             htmlFor="file-upload"
//                             className="file-input">
//                             Upload Image
//                         </label>
//                         <input
//                             id="file-upload"
//                             type="file"
//                             onChange={handleFileChange}
//                         />
//                         <button className="upload-button" onClick={handleUpload} disabled={loading}>
//                             {loading ? 'Processing...' : 'Upload and Predict'}
//                         </button>
//                     </div>
//                     {loading && <div className="loading">Analyzing...</div>}
//                     {result && <h2 className="result">Diagnosis: {result}</h2>}
//                     <div className="footer">
//                         <p>Powered by AI for Kidney Disease Diagnosis</p>
//                     </div>
//                 </div>
//                 {file && <div className="content">
//                     <h1 className="title">CT Image Diagnosis</h1>
//                     <p className="subtitle">Upload a CT image of the kidney to diagnose the condition (Tumor, Cyst, Stone, Normal).</p>
//                     <div className="upload-section">
//                         <label
//                             htmlFor="file-upload"
//                             className="file-input"
//                             multiple>
//                             Upload Image
//                         </label>
//                         <input
//                             id="file-upload"
//                             type="file"
//                             onChange={handleFileChange}
//                             multiple
//                         />
//                         <button className="upload-button" onClick={handleUpload} disabled={loading}>
//                             {loading ? 'Processing...' : 'Upload and Predict'}
//                         </button>
//                     </div>
//                     {loading && <div className="loading">Analyzing...</div>}
//                     {result && Array.isArray(result) && (
//                         <div className="results">
//                             {result.map((res, index) => (
//                                 <h2 key={index} className="result">Diagnosis for file {index + 1}: {res}</h2>
//                             ))}
//                         </div>
//                     )}
//                 </div>}
//             </div>
//         </>
//     );
// }

// export default App;
