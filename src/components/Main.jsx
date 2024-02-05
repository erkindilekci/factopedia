import CategoryFilter from "./CategoryFilter.jsx";
import FactsSection from "./FactsSection.jsx";
import Loader from "./Loader.jsx";

export default function Main({CATEGORIES, facts, isLoading, handleSelectCategory, handleVote, isUpdating}) {
    return (
        <main className="main">
            <CategoryFilter CATEGORIES={CATEGORIES} handleSelectCategory={handleSelectCategory}/>
            {isLoading ? <Loader/> :
                <FactsSection handleVote={handleVote} isUpdating={isUpdating} CATEGORIES={CATEGORIES} facts={facts}/>}
        </main>
    );
}