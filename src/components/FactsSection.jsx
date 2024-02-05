import Fact from "./Fact.jsx";

export default function FactsSection({CATEGORIES, facts, handleVote, isUpdating}) {
    if (facts.length === 0) return <p className="message">No facts for this category yet!</p>;

    return (
        <section>
            <ul className="facts-list">
                {facts.map(fact => <Fact key={fact.id} fact={fact} handleVote={handleVote} isUpdating={isUpdating}
                                         backgroundColor={CATEGORIES.find(c => c.name === fact.category).color}/>)}
            </ul>
            <p>There are {facts.length} facts in the database.</p>
        </section>
    );
}