import React, { useState } from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import QuestionService from '../Services/QuestionService'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router";

export default function CreateQuestion() {
    const history = useHistory()
    const [isDisabled, setIsDisabled] = useState(false)
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([
        {
            name: null,
            value: null
        }
    ]);
    const handleSubmit = (event) => {
        setIsDisabled(true);
        event.preventDefault();
        console.log(event.target);
        var postData = {
            "title":question,
            "answers": answers.map(p => p.value)
        }
        
        let questionService = new QuestionService()
        questionService.CreateQuestion(postData).then((result) => {
            setIsDisabled(false);
            if(result.data.errors !== null){
                toast.error(`${result.data.errors.map(p => p)}` );
                
            }
            if(result.data.data !== null){
                toast.success(`${result.data.data.title} -- Oylaması başladı... Oylama sayfasına yönlendiriliyorsunuz` );
                history.push(`/questions/${result.data.data.id}`);

            }
        });

    }
    const addAnswer = (event) => {
        var findName = answers.find(p => p.name === event.name);
        var newStateArray = answers.filter(p => p.value !== "");
        newStateArray = newStateArray.filter(p => p.value !== null);
        if (findName == null) {

            newStateArray.push({
                "name": event.name,
                "value": event.value
            });
            setAnswers(newStateArray);
        } else {
            newStateArray = newStateArray.filter(e => e.name !== event.name);
            if (event.value !== "" || event.value !== null) {
                newStateArray.push({
                    "name": event.name,
                    "value": event.value
                });
            }
            setAnswers(newStateArray);
        }
    }

    return (
        <>
        <ToastContainer />
        <Card>
            <Form onSubmit={handleSubmit}>
                <Card.Header>Oylama Oluştur</Card.Header>
                <Card.Body>

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Soru</Form.Label>
                        <Form.Control type="text" name="question" placeholder="Sorunuzu giriniz" value={question} onChange={e => setQuestion(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Seçenek 1</Form.Label>
                        <Form.Control type="text" name="answer1" placeholder="Seçenek 1" onChange={e => addAnswer(e.target)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Seçenek 2</Form.Label>
                        <Form.Control type="text" name="answer2" placeholder="Seçenek 2" onChange={e => addAnswer(e.target)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Seçenek 3</Form.Label>
                        <Form.Control type="text" name="answer3" placeholder="Seçenek 3" onChange={e => addAnswer(e.target)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Seçenek 4</Form.Label>
                        <Form.Control type="text" name="answer4" placeholder="Seçenek 4" onChange={e => addAnswer(e.target)} />
                    </Form.Group>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                    <Button variant="success" type="submit" size="sm" disabled={isDisabled}>
                        Oylamayı Başlat
                    </Button>{' '}


                </Card.Footer>
            </Form>
        </Card>
        </>

    )
}
