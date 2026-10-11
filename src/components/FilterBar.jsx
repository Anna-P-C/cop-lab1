export default function FilterBar({ filters, onFilterChange, onReset }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className="card filter-bar-card">
            <div className="filter-grid">

                <div className="filter-group">
                    <label htmlFor="search-input">Пошук фільму:</label>
                    <input
                        id="search-input"
                        type="text"
                        name="query"
                        placeholder="Введіть назву фільму..."
                        value={filters.query}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="rating-select">Мін. рейтинг:</label>
                    <select
                        id="rating-select"
                        name="minRating"
                        value={filters.minRating}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="0">Будь-який</option>
                        <option value="6">Від 6.0 ★</option>
                        <option value="7">Від 7.0 ★</option>
                        <option value="8">Від 8.0 ★</option>
                    </select>
                </div>


                <div className="filter-group">
                    <label htmlFor="year-select">Рік релізу:</label>
                    <select
                        id="year-select"
                        name="year"
                        value={filters.year}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Всі роки</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                </div>


                <div className="filter-actions">
                    <button
                        type="button"
                        className="btn-secondary btn-reset"
                        onClick={onReset}
                    >
                        Скинути фільтри
                    </button>
                </div>
            </div>
        </div>
    );
}