export default function KpiCard({ title, value, change, isPositive = true }) {
    return (
        <div className="card kpi-card">
            <span className="kpi-title">{title}</span>
            <h3 className="kpi-value">{value}</h3>
            <span className={`kpi-change ${isPositive ? "positive" : "negative"}`}>
        {isPositive ? "▲" : "▼"} {change}
      </span>
        </div>
    );
}