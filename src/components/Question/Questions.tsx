'use client';

import questionsandanswers from "./data/questionsandanswers.json";

import React, {useState} from 'react';
import {Button, Heading} from "@navikt/ds-react";


export interface Question {
    id: number;
    question: string;
    answer: string;
}


const Questions = () => {

    const [randomQuestions, setRandomQuestions] = useState<Question[]>();


    const find10Questions = async () => {
        const questions = find10RandomQuestions()
        setRandomQuestions(questions);
    }

    return (

        <div className="flex min-h-screen flex-col p-16 md:items-center">
            <Button className="mb-4" variant="primary" size="medium" onClick={find10Questions}>Random questions</Button>
            <div className="flex min-h-screen flex-col p-16">
                {randomQuestions?.map(question =>
                    <div key={question.id} className="mt-10">
                        <Heading size="large" level="1" spacing>{question.question} </Heading>
                        <Heading size="medium" level="1" spacing>Svar: {question.answer} </Heading>
                    </div>
                )}
            </div>
        </div>
    );
};

function find10RandomQuestions(): Question[] {
    const questions: Question[] = []

    for (let i = 0; i < 10; i++) {
        const question = findUniqueRandomQuestion(questions)
        questions.push(question)
        //console.log(`inside of logg: ${i}`)
    }

    return questions
}

function findRandomQuestion(): Question {
    return questionsandanswers[Math.floor(Math.random() * questionsandanswers.length)]
}

function findUniqueRandomQuestion(questions: Question[]): Question {
    let question = findRandomQuestion()
    while (questions.find(currentQuestion => currentQuestion.id == question.id)) {
        question = findRandomQuestion()
    }
    return question;
}

export default Questions;
