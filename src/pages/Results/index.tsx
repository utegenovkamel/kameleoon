import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useHttp } from "../../hooks/http.hook";
import { TestI } from "../../interfaces";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import "./style.scss";

const Results = () => {
    const urlParams: { id: string | undefined } = useParams();
    const history = useHistory();
    const [
        requestResult,
        dataResult,
        loadingResult,
        errorResult,
    ] = useHttp<TestI>();

    useEffect(() => {
        requestResult(`http://localhost:3100/tests/${urlParams.id}`);
    }, []);

    return (
        <div className="results container">
            <h2 className="results__title page-title">Results</h2>
            {loadingResult && <Loader />}
            {dataResult && (
                <ul>
                    <li className="results__item">Name: {dataResult.name}</li>
                    <li className="results__item">Type: {dataResult.type}</li>
                    <li className="results__item">
                        Status: {dataResult.status}
                    </li>
                </ul>
            )}
            <div
                className="results__back"
                onClick={() => history.push("/dashboard/")}
            >
                <img src={ArrowLeft} alt="arrow" className="results__arrow" />
                <span className="results__text">Back</span>
            </div>
        </div>
    );
};

export default Results;
