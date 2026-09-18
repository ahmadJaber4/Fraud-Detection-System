import { Routes, Route } from "react-router-dom"
import PredictForm from "./components/PredictForm"
import Dashboard from "./components/Dashboard"

function App() {

  return (
    <Routes>
      <Route path="/" element={<PredictForm/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
