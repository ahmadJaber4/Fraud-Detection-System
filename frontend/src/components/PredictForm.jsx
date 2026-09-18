import { useState } from "react";
import Header from "./Header";

export default function PredictForm(){
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
            <Header/>
        </>
    )
}