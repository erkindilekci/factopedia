export default function Header({showForm, handleShareButtonClick}) {
    return (
        <header className="header">
            <div className="logo">
                <h1>Factopedia</h1>
            </div>

            <button onClick={handleShareButtonClick}
                    className="btn btn-large btn-open">{showForm ? 'Close' : 'Share a fact'}</button>
        </header>
    );
}