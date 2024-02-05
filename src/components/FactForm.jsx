import {useRef} from "react";

export default function FactForm({CATEGORIES, handleAddFact, isUploading}) {
    const formRef = useRef();

    const isValidUrl = (urlString) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!urlPattern.test(urlString);
    };

    const handleSubmit = function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        console.log(formProps);

        const notEmpty = [...Object.values(formProps)].every(v => v);

        if (notEmpty) {
            const isTextTooLong = formProps.text.length > 200;
            const isSourceValid = isValidUrl(formProps.source);

            if (isTextTooLong) alert('Text cannot be longer than 200 character!');
            else if (!isSourceValid) alert('Source is not valid URL!');
            else {
                const newFact = {
                    id: Math.round(Math.random() * 10000000),
                    text: formProps.text,
                    source: formProps.source,
                    category: formProps.category,
                    votesInteresting: 0,
                    votesMindblowing: 0,
                    votesFalse: 0,
                    createdIn: new Date().getFullYear(),
                };

                handleAddFact(newFact);

                formRef.current.reset();
            }
        } else alert('Inputs cannot be empty!');
    };

    return (
        <form className="fact-form" ref={formRef} onSubmit={handleSubmit}>
            <input type="text" name="text" placeholder="Share a fact with the world..." disabled={isUploading}/>
            <input type="text" name="source" placeholder="Trustworthy source..." disabled={isUploading}/>
            <select name="category" disabled={isUploading}>
                <option value="">Choose category:</option>
                {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name.toLowerCase()}>
                        {c.name[0].toUpperCase() + c.name.slice(1)}
                    </option>
                ))}
            </select>
            <button type="submit" className="btn btn-large" disabled={isUploading}>Post</button>
        </form>
    );
}