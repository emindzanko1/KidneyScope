import Button from "../Button/Button";
import FileInput from "../FileInput/FileInput";

const FileUpload = ({ files, handleFileChange, handleUpload, isLoading }) => {
    return (
        <>
            <FileInput files={files} handleFileChange={handleFileChange} />
            {files.length > 0 && (
                <Button
                    className="upload-button"
                    onClick={handleUpload}
                    text={isLoading ? 'Processing...' : 'Upload and Predict'}
                />
            )}
        </>
    );
};

export default FileUpload;
