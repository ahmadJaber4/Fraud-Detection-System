// import libraries
import axios from 'axios'
import { useState } from "react";
import Header from "../Header/Header";
import "./PredictForm.css";

// predict form component => user enters transaction details and gets the prediction (Safe/Fraud)
export default function PredictForm() {
    // input state (transaction details)
    const [inputData, setInputData] = useState({
        amount: '',
        location: '',
        device_type: 'Mobile',
        age: '',
        income: '',
        debt: '',
        credit_score: ''
    })
    // prediction state (0/1)
    const [prediction, setPrediction] = useState(null)

    // loading and error states
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // handle input change function
    function handleChange(e) {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }));
    }

    // analyze input function
    async function analyzeInput() {
        // clear previous states
        setError(null)
        setPrediction(null)

        // check empty fields
        for (const field in inputData) {
            if (inputData[field].toString().trim() === '') {
                setError("No empty fields are allowed")
                return;
            }
        }

        // start loading
        setIsLoading(true)

        // build the payload (to be sent to the backend)
        const payload = {
            ...inputData,
            location: inputData.location.trim(),
            amount: Number(inputData.amount),
            age: Number(inputData.age),
            income: Number(inputData.income),
            debt: Number(inputData.debt),
            credit_score: Number(inputData.credit_score),
        }

        try {
            // POST request (returns prediction 0/1)
            const result = await axios.post('http://127.0.0.1:8000/predictions/', payload)
            setPrediction(result.data)
        }
        catch (err) {
            if (err.response) {
                // error status code from the backend
                const detail = err.response.data.detail
                if (Array.isArray(detail)) {
                    // Pydantic rejects request body (doesn't match conditions)
                    setError(
                        detail
                            .map(d => `${d.loc.at(-1)}: ${d.msg}`)
                            .join('\n')
                    )
                } else {
                    // self-defined error
                    setError(detail)
                }
            } else {
                // request never reached backend
                setError(err.message)
            }
        }
        finally {
            // end loading
            setIsLoading(false)
        }
    }

    // handle clear form function
    function handleClear() {
        // reset all fields
        setInputData({
            amount: '',
            location: '',
            device_type: 'Mobile',
            age: '',
            income: '',
            debt: '',
            credit_score: ''
        })
        // reset states
        setPrediction(null)
        setIsLoading(false)
        setError(null)
    }

    return (
        <>
            <Header />
            {/* TITLE */}
            <h3 className="form-title">Enter transaction details</h3>

            {/* PREDICT FORM */}
            <div className="predict-form">
                {/* INPUT FIELDS */}
                <div className="input">
                    <label>Amount</label>
                    <input type="number" name="amount" value={inputData.amount} min='1' onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Location</label>
                    <input type="text" name="location" value={inputData.location} onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Device Type</label>
                    <select name="device_type" value={inputData.device_type} id="device" onChange={handleChange}>
                        <option value="Mobile">Mobile</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Tablet">Tablet</option>
                    </select>
                </div>

                <div className="input">
                    <label>Age</label>
                    <input type="number" name="age" value={inputData.age} min='18' max='100' onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Income</label>
                    <input type="number" name="income" value={inputData.income} min='0' onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Debt</label>
                    <input type="number" name="debt" value={inputData.debt} min='0' onChange={handleChange} />
                </div>

                <div className="input">
                    <label>Credit Score</label>
                    <input type="number" name="credit_score" value={inputData.credit_score} min='300' max='850' onChange={handleChange} />
                </div>

                {/* BUTTONS (ANALYZE OR CLEAR) */}
                <div className="buttons-box">
                    <button className="btn analyze-btn" onClick={analyzeInput} disabled={isLoading}>
                        {isLoading ? <i className="fa-solid fa-spinner fa-spin fa-xl" style={{ color: 'white' }}></i>
                            : 'Analyze'}
                    </button>
                    <button className="btn clear-btn" onClick={handleClear} disabled={isLoading}>
                        Clear
                    </button>
                </div>

                {/* PREDICTION RESULT OR ERROR */}
                <div className="result-box">
                    {
                        error &&
                        <div style={{ color: 'red', textAlign: 'left' }}>
                            {error}
                        </div>
                    }

                    {
                        prediction &&
                        <>
                            <div>
                                Predicted label: {prediction.predicted_label == 1 ?
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>Fraud</span>
                                    : <span style={{ color: '#22de28', fontWeight: 'bold' }}>Safe</span>}
                            </div>
                            <div>
                                Risk probability: {(prediction.predicted_probability * 100).toFixed(2)}%
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}