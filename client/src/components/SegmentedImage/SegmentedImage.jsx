import { generatePDF } from '../../util/pdfutil';
import './SegmentedImage.css';

const SegmentedImage = ({ file, diagnosis }) => {
    const handleDownloadPDF = () => {
        generatePDF({ diagnosis }, file);
    };

    return (
        <div className="segmented-image">
            <img
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="result-image"
            />
            <p className="diagnosis">Diagnosis: {diagnosis}</p>
            <button className="download-pdf-button" onClick={handleDownloadPDF}>
                Download PDF
            </button>
        </div>
    );
};

export default SegmentedImage;
