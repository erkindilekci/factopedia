export default function Fact({fact, backgroundColor, handleVote, isUpdating}) {
    const isDisputed = (fact.votesInteresting + fact.votesMindblowing) < fact.votesFalse;

    return (
        <li className="fact">
            <p>
                {isDisputed && <span className="disputed">[⛔️DISPUTED]</span>}
                {fact.text}
                <a className="source" href={fact.source} target="_blank">(Source)</a>
            </p>
            <span className="tag"
                  style={{backgroundColor: backgroundColor}}>{fact.category}</span>
            <div className="vote-buttons">
                <button onClick={() => handleVote(fact, 'votesInteresting')}
                        disabled={isUpdating}>👍 {fact.votesInteresting}</button>
                <button onClick={() => handleVote(fact, 'votesMindblowing')}
                        disabled={isUpdating}>🤯 {fact.votesMindblowing}</button>
                <button onClick={() => handleVote(fact, 'votesFalse')}
                        disabled={isUpdating}>⛔️ {fact.votesFalse}</button>
            </div>
        </li>
    );
}