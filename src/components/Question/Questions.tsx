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
        const questions = find5RandomQuestions()
        setRandomQuestions(questions);
    }

    return (

        <div className="flex min-h-screen flex-col p-16 md:items-center md:p-24">
            <Button className="mb-4" variant="primary" size="medium" onClick={find10Questions}>Random questions</Button>
            <div className="md:flex md:min-h-screen md:flex-col">
                {randomQuestions?.map(question =>
                    <div key={question.id} className="mt-4 md:mt-10">
                        <Heading size="large" level="1" spacing>{question.question} </Heading>
                        <Heading size="medium" style={{fontWeight: 'bold', color: "blueviolet"}} level="1" spacing>Svar: {question.answer} </Heading>
                    </div>
                )}
            </div>
        </div>
    );
};

function find5RandomQuestions(): Question[] {
    const questions: Question[] = []

    for (let i = 0; i < 5; i++) {
        const question = findUniqueRandomQuestion(questions)
        questions.push(question)
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
