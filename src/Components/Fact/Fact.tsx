import { useEffect, useState } from "react";
import "./Fact.scss"
import { Quote } from "./FactData";

const Fact = () => {
    const [currQuote, setCurrQuote] = useState<string>('')

    useEffect(() => {
        changeQuote();

        const interval = setInterval(() => {
            changeQuote();
        }, 1000 * 30);

        return () => clearInterval(interval);
    }, []);

    const changeQuote = () => {
        const randNum = Math.round(Math.round(Math.random() * Quote.length - 1));
        setCurrQuote(Quote[randNum])
    }

    return (
        <div className="marqueeContainer">
            <div className="marquee">
                {currQuote}
            </div>
        </div>
    )
}

export default Fact