export default function RecentTable({recentPredictions}) {

    return (
        <div className="table-container">
            <table className='recent-table'>
                <caption>Recent Predictions</caption>

                <thead>
                    <tr>
                        <th>Created At</th>
                        <th>Amount</th>
                        <th>Location</th>
                        <th>Label</th>
                    </tr>
                </thead>

                <tbody>
                    {recentPredictions.map((record, index) => {
                        const isFraud = record['is_fraud']
                        const formattedDate = new Date(record['created_at']).toLocaleString()
                        const formattedAmount = Number(record['amount']).toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'USD'
                        })

                        return (
                            <tr key={index}>
                                <td>{formattedDate}</td>
                                <td>{formattedAmount}</td>
                                <td>{record['location']}</td>
                                <td>
                                    <span className={`fraud-badge ${isFraud ? 'fraud' : 'safe'}`}>
                                        {isFraud ? 'Fraud' : 'Safe'}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}