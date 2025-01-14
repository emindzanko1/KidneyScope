import './SegmentedImage.css';

const SegmentedImage = ({ file, diagnosis }) => {
    return (
        <div className="segmented-image">
            <img
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="result-image"
            />
            <p className="diagnosis">Diagnosis: {diagnosis}</p>
        </div>
    );
};

export default SegmentedImage;
