import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useHttp } from "../../hooks/http.hook";
import { TestI } from "../../interfaces";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import "./style.scss";

const Finalize = () => {
    const urlParams: { id: string | undefined } = useParams();
    const history = useHistory();
    const [
        requestFinalize,
        dataFinalize,
        loadingFinalize,
        errorFinalize,
    ] = useHttp<TestI>();

    useEffect(() => {
        requestFinalize(`http://localhost:3100/tests/${urlParams.id}`);
    }, []);

    return (
        <div className="finalize container">
            <h2 className="finalize__title page-title">Finalize</h2>
            {loadingFinalize && <Loader />}
            {dataFinalize && (
                <ul>
                    <li className="finalize__item">
                        Name: {dataFinalize.name}
                    </li>
                    <li className="finalize__item">
                        Type: {dataFinalize.type}
                    </li>
                    <li className="finalize__item">
                        Status: {dataFinalize.status}
                    </li>
                </ul>
            )}

            <div
                className="finalize__back"
                onClick={() => history.push("/dashboard/")}
            >
                <img src={ArrowLeft} alt="arrow" className="finalize__arrow" />
                <span className="finalize__text">Back</span>
            </div>
        </div>
    );
};

export default Finalize;
