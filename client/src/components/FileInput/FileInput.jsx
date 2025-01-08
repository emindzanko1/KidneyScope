import './FileInput.css';

const FileInput = ({ files, handleFileChange }) => {
    console.log(files);
    console.log('emin');
    return (
        <>
            <label htmlFor="file-upload" className="file-label">
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
            )}
        </>
    )
}

export default FileInput;