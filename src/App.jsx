import Header from "./components/Header.jsx";
import FactForm from "./components/FactForm.jsx";
import Main from "./components/Main.jsx";
import {useEffect, useState} from "react";
import supabase from "./supabase.js";

const CATEGORIES = [
    {name: "technology", color: "#3b82f6"},
    {name: "science", color: "#16a34a"},
    {name: "finance", color: "#ef4444"},
    {name: "society", color: "#eab308"},
    {name: "entertainment", color: "#db2777"},
    {name: "health", color: "#14b8a6"},
    {name: "history", color: "#f97316"},
    {name: "news", color: "#8b5cf6"},
];

function App() {
    const [showForm, setShowForm] = useState(false);
    const [facts, setFacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [isUploading, setIsUploading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const getFacts = async function () {
            let query = supabase.from('facts').select('*');

            if (currentCategory !== 'all') query = query.eq('category', currentCategory);

            const {data: facts, error} = await query.order('votesInteresting', {ascending: false});

            if (!error) setFacts(facts);
            else alert(error.message);
            setIsLoading(false);
        };
        getFacts();
    }, [currentCategory]);

    const handleShareButtonClick = function () {
        setShowForm(prevState => !prevState);
    };

    const handleAddFact = async function (newFact) {
        setIsUploading(true);

        const {data: savedFact, error} = await supabase
            .from('facts')
            .insert([{text: newFact.text, source: newFact.source, category: newFact.category}])
            .select();

        setIsUploading(false);
        if (!error) setFacts(prevFacts => [savedFact[0], ...prevFacts]);
        setShowForm(false);
    };


    const handleSelectCategory = function (e) {
        setCurrentCategory(e.target.textContent);
    };

    const handleVote = async function (fact, columnToUpdate) {
        setIsUpdating(true);

        const {data: updatedFact, error} = await supabase
            .from('facts')
            .update({[columnToUpdate]: fact[columnToUpdate] + 1})
            .eq('id', fact.id)
            .select();

        setIsUpdating(false);
        if (!error) setFacts(prevFacts => prevFacts.map(f => f.id === fact.id ? updatedFact[0] : f));
    };

    return (
        <>
            <Header showForm={showForm} handleShareButtonClick={handleShareButtonClick}/>
            {showForm && <FactForm CATEGORIES={CATEGORIES} handleAddFact={handleAddFact} isUploading={isUploading}/>}
            <Main CATEGORIES={CATEGORIES} facts={facts} isLoading={isLoading}
                  handleSelectCategory={handleSelectCategory} handleVote={handleVote} isUpdating={isUpdating}/>
        </>
    );
}

export default App;
