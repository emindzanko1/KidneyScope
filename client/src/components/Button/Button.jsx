import './Button.css';
const Button = ({ text, className, onClick, disabled, ...props }) => {
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {text}
        </button>
    );
};

export default Button;
