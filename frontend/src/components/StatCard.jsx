export default function StatCard({name, value}){
    const edited_name = name.replaceAll('_', " ")
                     .replace(/\b\w/g, char => char.toUpperCase())
    const isPercent = name === 'fraud_rate' || name === 'safe_rate'

    const category = name.startsWith('fraud') ? 'fraud'
        : name.startsWith('safe') ? 'safe'
        : ''

    return(
        <div className={`stat-card ${category}`}>
            <h3 className="stat-name">{edited_name}</h3>
            <p className="stat-value">{`${value}${isPercent ? '%' : ''}`}</p>
        </div>
    )
}