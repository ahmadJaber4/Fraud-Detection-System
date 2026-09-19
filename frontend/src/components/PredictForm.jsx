import { useState } from "react";
import Header from "./Header";

export default function PredictForm() {
    const [inputData, setInputData] = useState({
        amount: null,
        location: null,
        device_type: null,
        age: null,
        income: null,
        debt: null,
        credit_score: null
    })

    return (
        <>
            <Header />
            <h3 className="form-title">Enter transaction details:</h3>
            <div className="predict-form">
                <div className="input">
                    <label>Amount</label>
                    <input type="text" className="text-input" />
                </div>

                <div className="input">
                    <label>Location</label>
                    <input type="text" className="text-input" />
                </div>

                <div className="input">
                    <label>Device Type</label>
                    <select name="device" id="device">
                        <option value="mobile">Mobile</option>
                        <option value="desktop">Desktop</option>
                        <option value="tablet">Tablet</option>
                    </select>
                </div>

                <div className="input">
                    <label>Age</label>
                    <input type="number" min='18' max='100' />
                </div>

                <div className="input">
                    <label>Income</label>
                    <input type="text" className="text-input" />
                </div>

                <div className="input">
                    <label>Debt</label>
                    <input type="text" className="text-input" />
                </div>

                <div className="input">
                    <label>Credit Score</label>
                    <input type="number" min='300' max='850' />
                </div>
                
                <div className="buttons-box">
                    <button className="btn analyze-btn">Analyze</button>
                    <button className="btn clear-btn">Clear</button>
                </div>

                <div className="result-box"></div>
            </div>
        </>
    )
}