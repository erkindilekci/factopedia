export default function CategoryFilter({CATEGORIES, handleSelectCategory}) {
    return (
        <aside>
            <ul>
                <li className="category">
                    <button className="btn btn-all-categories" onClick={handleSelectCategory}>all</button>
                </li>
                {CATEGORIES.map(c => <li key={c.name} className="category">
                    <button className="btn btn-category" style={{backgroundColor: c.color}}
                            onClick={handleSelectCategory}>{c.name}</button>
                </li>)}
            </ul>
        </aside>
    );
}