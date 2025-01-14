import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SegmentedImage from '../SegmentedImage/SegmentedImage';
import './ResultsSlider.css';

const ResultsSlider = ({ results }) => {
    const CustomNextArrow = (props) => (
        <div {...props} className="custom-arrow next-arrow">
            <FaArrowRight />
        </div>
    );

    const CustomPrevArrow = (props) => (
        <div {...props} className="custom-arrow prev-arrow">
            <FaArrowLeft />
        </div>
    );

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div className="results-container">
            {results.length === 1 ? (
                <SegmentedImage file={results[0].file} diagnosis={results[0].diagnosis} />
            ) : (
                <div className="slider-wrapper">
                    <Slider {...sliderSettings}>
                        {results.map((result, index) => (
                            <SegmentedImage key={index} file={result.file} diagnosis={result.diagnosis} />
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default ResultsSlider;
