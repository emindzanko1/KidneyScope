import ResultsSlider from "../ResultsSlider/ResultsSlider";
import { useState } from "react";
import './MainContent.css';
import AppContent from "../AppContent/AppContent";

const MainContent = () => {
  const [results, setResults] = useState([]);

    return (
        <main className="main">
            <div className="main-container">
                <AppContent setResults={setResults}/>
                {results.length > 0 && (
                    <ResultsSlider results={results} />
                )}
            </div>
        </main >
    )
}

export default MainContent;