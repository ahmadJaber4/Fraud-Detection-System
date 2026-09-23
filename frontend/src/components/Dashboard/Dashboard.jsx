import axios from 'axios'
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import StatCard from './StatCard';
import RecentTable from './RecentTable';
import './Dashboard.css'

export default function Dashboard() {
    const [stats, setStats] = useState({
        total_predictions: 0,
        fraud_count: 0,
        safe_count: 0,
        fraud_rate: 0.0,
        safe_rate: 0.0
    })
    const [recentPredictions, setRecentPredictions] = useState([])

    useEffect(() => {
        async function fetchStats() {
            const response = await axios.get('http://127.0.0.1:8000/dashboard/stats/')
            const final_stats = {
                ...response.data,
                fraud_rate: response.data['fraud_rate'].toFixed(2),
                safe_rate: response.data['safe_rate'].toFixed(2)
            }
            setStats(final_stats)
        }

        fetchStats()
    }, [])

    useEffect(() => {
        async function fetchRecents() {
            const response = await axios.get('http://127.0.0.1:8000/dashboard/recent/')
            setRecentPredictions(response.data)
        }

        fetchRecents()
    }, [])

    return (
        <>
            <Header />
            <div className='stats'>
                {Object.entries(stats).map(([name, value]) => {
                    return <StatCard key={name} name={name} value={value} />
                })}
            </div>
            {
                recentPredictions.length > 0 ?
                <RecentTable recentPredictions={recentPredictions}/>
                :
                <div className='no-predictions'>
                    No Predictions yet
                </div>
            }
        </>
    )
}