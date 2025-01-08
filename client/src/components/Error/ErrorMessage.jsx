import './ErrorMessage.css'; 

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="error">
            {message}
        </div>
    );
};

export default ErrorMessage;
