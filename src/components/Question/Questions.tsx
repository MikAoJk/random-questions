'use client';

import questionsandanswers from "./data/questionsandanswers.json";
import questionsandanswersen from "./data/questionsandanswersen.json";

import React, {ChangeEvent, useState} from 'react';
import {Button, Heading, UNSAFE_Combobox} from "@navikt/ds-react";


export interface Question {
    id: number;
    question: string;
    answer: string;
}


const Questions = () => {
    const langOptions: string[] = ["NO", "EN"]

    const [randomQuestions, setRandomQuestions] = useState<Question[]>();
    const [selectedOption, setSelectedOption] = useState<string>("NO");
    const [languageIsNo, setlanguageIsNo] = useState<boolean>(true);


    const find10QuestionsNo = async () => {
        const questions = find5RandomQuestions("NO")
        setRandomQuestions(questions);
    }
    const find10Questions = async () => {
        const questions = find5RandomQuestions("EN")
        setRandomQuestions(questions);
    }



    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>): void => {
        console.info(event.target.value)
        setSelectedOption(event.target.value);
        setlanguageIsNo(event.target.value === "NO")
    };


    return (

        <div className="flex min-h-screen flex-col p-16 md:items-center md:p-24">
            <select className="max-w-20 mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedOption} onChange={onChangeHandler}>
                <option value='EN'>EN</option>
                <option value='NO'>NO</option>
            </select>

            {languageIsNo && <Button className="mb-4 mt-4" variant="primary" size="medium" onClick={find10QuestionsNo}>Tilfeldige
                spørsmål</Button>}
            {!languageIsNo && <Button className="mb-4 mt-4" variant="primary" size="medium" onClick={find10Questions}>Random
                questions</Button>}

            <div className="md:flex md:min-h-screen md:flex-col">
                {randomQuestions?.map(question =>
                    <div key={question.id} className="mt-4 md:mt-10">
                        <Heading size="large" level="1" spacing>{question.question} </Heading>
                        {languageIsNo &&
                            <Heading size="medium" style={{fontWeight: 'bold', color: "blueviolet"}} level="1"
                                     spacing>Svar: {question.answer} </Heading>}
                        {!languageIsNo &&
                            <Heading size="medium" style={{fontWeight: 'bold', color: "blueviolet"}} level="1"
                                     spacing>Answer: {question.answer} </Heading>}
                    </div>
                )}
            </div>
        </div>
    );
};

function find5RandomQuestions(language: string): Question[] {
    const questions: Question[] = []

    for (let i = 0; i < 5; i++) {
        const question = findUniqueRandomQuestion(questions, language)
        questions.push(question)
    }

    return questions
}

function findRandomQuestion(language: string): Question {
    if (language === "NO") {
        return questionsandanswers[Math.floor(Math.random() * questionsandanswers.length)]
    } else {
        return questionsandanswersen[Math.floor(Math.random() * questionsandanswers.length)]

    }
}

function findUniqueRandomQuestion(questions: Question[], language: string): Question {
    let question = findRandomQuestion(language)
    while (questions.find(currentQuestion => currentQuestion.id == question.id)) {
        question = findRandomQuestion(language)
    }
    return question;
}

export default Questions;
