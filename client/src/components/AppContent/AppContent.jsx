import { useState } from 'react';
import axios from 'axios';
import ContentHeader from "../ContentHeader/ContentHeader"
import ErrorMessage from "../Error/ErrorMessage"
import Button from "../Button/Button";
import './AppContent.css';
import FileUpload from '../FileUpload/FileUpload';

const AppContent = ({ setResults }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [files, setFiles] = useState([]);

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


    const handleFileChange = e => {
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
                return { file: resizedFile, diagnosis: response.data.predicted_class };
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
        <div className="app-container">
            <div className="content">
                <ContentHeader />
                {error && <ErrorMessage message={error} />}
                {!isUploaded && (
                    <FileUpload
                        files={files}
                        handleFileChange={handleFileChange}
                        handleUpload={handleUpload}
                        isLoading={isLoading}
                    />
                )}
                {isUploaded && (
                    <Button
                        text="Reset Images"
                        className="reset-button"
                        onClick={handleReset}
                    />
                )}
            </div>
        </div>
    )
}

export default AppContent;