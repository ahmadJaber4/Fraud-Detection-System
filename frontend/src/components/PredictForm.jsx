import axios from 'axios'
import { useState } from "react";
import Header from "./Header";

export default function PredictForm() {
    const [inputData, setInputData] = useState({
        amount: '',
        location: '',
        device_type: 'Mobile',
        age: '',
        income: '',
        debt: '',
        credit_score: ''
    })

    const [prediction, setPrediction] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    function handleChange(e) {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }));
    }

    async function analyzeInput() {
        setError(null)
        setPrediction(null)

        for (const field in inputData) {
            if (inputData[field].toString().trim() === '') {
                setError("No empty fields are allowed")
                return;
            }
        }

        setIsLoading(true)

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
            const result = await axios.post('http://127.0.0.1:8000/predictions/', payload)
            setPrediction(result.data)
        }
        catch (err) {
            if (err.response) {
                const detail = err.response.data.detail
                if (Array.isArray(detail)) {
                    setError(
                        detail
                            .map(d => `${d.loc.at(-1)}: ${d.msg}`)
                            .join('\n')
                    )
                } else {
                    setError(detail)
                }
            } else {
                setError(err.message)
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    function handleClear() {
        setInputData({
            amount: '',
            location: '',
            device_type: 'Mobile',
            age: '',
            income: '',
            debt: '',
            credit_score: ''
        })
        setPrediction(null)
        setIsLoading(false)
        setError(null)
    }

    return (
        <>
            <Header />
            <h3 className="form-title">Enter transaction details</h3>
            <div className="predict-form">
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

                <div className="buttons-box">
                    <button className="btn analyze-btn" onClick={analyzeInput} disabled={isLoading}>
                        {isLoading ? <i className="fa-solid fa-spinner fa-spin fa-xl" style={{ color: 'white' }}></i>
                            : 'Analyze'}
                    </button>
                    <button className="btn clear-btn" onClick={handleClear} disabled={isLoading}>
                        Clear
                    </button>
                </div>

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