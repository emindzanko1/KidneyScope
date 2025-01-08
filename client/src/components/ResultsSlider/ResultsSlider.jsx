import Slider from "react-slick";
import './ResultsSlider.css';

const ResultsSlider = ({ results }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    
    // return (
    //     <div className="results-container">
    //       {results.length === 1 ? (
    //         <div>
    //           <img src={URL.createObjectURL(results[0].file)} alt="Uploaded" />
    //           <p>Diagnosis: {results[0].diagnosis}</p>
    //         </div>
    //       ) : (
    //         <Slider {...sliderSettings}>
    //           {results.map((result, idx) => (
    //             <div key={idx}>
    //               <img src={URL.createObjectURL(result.file)} alt={`Result ${idx}`} />
    //               <p>Diagnosis: {result.diagnosis}</p>
    //             </div>
    //           ))}
    //         </Slider>
    //       )}
    //       <Button onClick={handleReset} text="Reset Images" />
    //     </div>
    //   );

    return (
        <div className="results-container">
            {results.length === 1 ? (
                <div className="segmented-image">
                    <img
                        src={URL.createObjectURL(results[0].file)}
                        alt="Uploaded"
                        className="result-image"
                    />
                    <p className="diagnosis">Diagnosis: {results[0].diagnosis}</p>
                </div>
            ) : (
                <div className="slider-wrapper">
                    <Slider {...sliderSettings}>
                        {results.map((result, index) => (
                            <div key={index} className="segmented-image">
                                <img
                                    src={URL.createObjectURL(result.file)}
                                    alt={`Uploaded ${index}`}
                                    className="result-image"
                                />
                                <p className="diagnosis">Diagnosis: {result.diagnosis}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    )
}

export default ResultsSlider;