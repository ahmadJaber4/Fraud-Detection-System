import { NavLink } from "react-router-dom"
import logo from "../../assets/fraud-logo.png"
import './Header.css'

export default function Header(){
    return (
        <header className="header">
            <div className="logo-title">
                <img src={logo} alt="" />
                <h2>AI Fraud Detector</h2>
            </div>

            <div className="tabs">
                <NavLink 
                    to='/'
                    className={( {isActive }) => `tab ${isActive ? 'active' : ''}`}
                >
                    Predict
                </NavLink>

                <NavLink
                    to='/dashboard'
                    className={( {isActive }) => `tab ${isActive ? 'active' : ''}`}
                >
                    Dashboard
                </NavLink>
            </div>

            <div className="spacer"></div>
        </header>
    )
}