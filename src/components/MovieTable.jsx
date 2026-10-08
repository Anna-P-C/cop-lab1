import MovieCard from "./MovieCard";

export default function MovieTable({
                                       movies,
                                       sortBy,
                                       sortOrder,
                                       onSortChange,
                                       onOrderToggle
                                   }) {
    return (
        <div className="card table-card">
            <div className="table-header-controls">
                <h3>Каталог стрічок TMDb</h3>

                <div className="sorting-controls">
                    <label>
                        Сортувати за:
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                        >
                            <option value="vote_average">Рейтингом</option>
                            <option value="title">Назвою</option>
                            <option value="release_date">Датою релізу</option>
                            <option value="vote_count">Кількістю оцінок</option>
                        </select>
                    </label>

                    <button className="btn-secondary" onClick={onOrderToggle} type="button">
                        {sortOrder === "asc" ? "▲ За зростанням" : "▼ За спаданням"}
                    </button>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="custom-table">
                    <thead>
                    <tr>
                        <th>Стрічка</th>
                        <th>Дата релізу</th>
                        <th>Кількість оцінок</th>
                        <th>Рейтинг</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}