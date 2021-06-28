import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import QuestionService from '../Services/QuestionService'
import AnswerService from '../Services/AnswerService'
import { Card, Button,ProgressBar  } from 'react-bootstrap'
import { HubConnectionBuilder } from '@microsoft/signalr';

export default function QuestionDetail() {
    let { id } = useParams();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [answersProgress, setAnswersProgress] = useState([]);
    const [connection, setConnection] = useState(null)

    useEffect(() => {
        let questionService = new QuestionService();
        questionService.GetQuestionById(id).then((result) => {
            setQuestion(result.data.data);
        });

        let answerService = new AnswerService();
        answerService.GetAnswersByQuestionId(id).then((result) => {
            console.log(result.data.data)
            setAnswers(result.data.data);
        });

        answerService.GetProgressBar(id).then((result) => {
            console.log(result.data.data)
            setAnswersProgress(result.data.data);
        });

//https://localhost:44373/MyHub


    }, []);
useEffect(() => {
    const newConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:44373/MyHub')
    .withAutomaticReconnect()
    .build();

setConnection(newConnection);
}, []);


useEffect(() => {
    if (connection) {
        connection.start()
            .then(result => {
                console.log('Connected!');
                connection.invoke("AddToGroup",id);
                connection.on('ReceiveProgressBar', message => {
                    setAnswersProgress(message.data);
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }
}, [connection]);


    return (
        <>
            <Card>
                <Card.Header><h4><b>{question.title}</b></h4></Card.Header>
                <Card.Body>
                    {
                        answers.map((answer) => (
                            <Button key={answer.id} variant="primary m-2">{answer.title}</Button>
                        ))
                    }
                </Card.Body>
            </Card>
            <Card className="mt-2">
                <Card.Header><h4><b>Sonuçlar</b></h4></Card.Header>
                <Card.Body>
                {
                    answersProgress.map((answerProggress) => (
                <div key={answerProggress.id}>
                <h5>{answerProggress.title} - {answerProggress.percent}%</h5>
                
                <ProgressBar variant="success" animated now={answerProggress.percent} label={`${answerProggress.percent}%`} />
                <hr />
                </div>
                    ))
                }
                </Card.Body>
            </Card>
        </>
    )
}
