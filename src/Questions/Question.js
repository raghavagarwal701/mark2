import React from 'react';


const Question = ({ question, onOptionChange }) => {
    // const isLastQuestionOfEssential = question.maturityLevel !== 3; // Assuming maximum maturity level is 3
    const handleNextQuestion=()=>{
        var selectedOption = document.querySelector('input[name="options"]:checked');
        if(selectedOption){
            console.log("this is the selected option");
            console.log(selectedOption.value);
            onOptionChange(selectedOption.value);
            selectedOption.checked=false;
        }
        else {
            console.log("select a option");
        }
        
    }
    return (
    <div className="question-format" >
    <h1 className="question">{question.question}</h1>
    <form>
    {question.options.map((option, index) => (
        <>
            <input
                type="radio"
                id={`option${index}`}
                name="options"
                value={option[1]}
            />
            <label htmlFor={`option${index}`}>{option[0]}</label>
            <br />
        </>
    ))}
    </form>
    <button onClick={handleNextQuestion}>
        Next
    </button>
    </div>
);
};

export default Question;
