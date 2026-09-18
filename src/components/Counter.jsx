import { useState } from "react";

export default function Counter({ initialValue = 1, min = 1, max = 10, label = "Квитки" }) {
    const [count, setCount] = useState(initialValue);

    const increment = () => setCount((prev) => (prev < max ? prev + 1 : prev));
    const decrement = () => setCount((prev) => (prev > min ? prev - 1 : prev));
    const reset = () => setCount(initialValue);

    return (
        <div className="card counter-card">
            <h4>{label}</h4>
            <div className="counter-controls">
                <button onClick={decrement} disabled={count <= min}>−</button>
                <span className="counter-display">{count}</span>
                <button onClick={increment} disabled={count >= max}>+</button>
            </div>
            <button className="btn-secondary" onClick={reset}>Скинути значення</button>
        </div>
    );
}