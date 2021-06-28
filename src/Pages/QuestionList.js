import React, { useState, useEffect } from 'react'
import QuestionService from '../Services/QuestionService'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function QuestionList() {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        let questionService = new QuestionService()
        questionService.GetQuestions().then((result) => {
            var pureData = result.data;
            setQuestions(pureData.data);

        })
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Soru</th>
                    <th>Oylamaya katıl</th>
                </tr>
            </thead>
            <tbody>
                {
                    questions.map((question) => (

                        <tr key={question.id}>
                            <td>{question.title}</td>
                            <td><Link
                            to={`/questions/${question.id}`}
                            ><Button variant="primary">Oylamaya Katıl</Button>{' '}</Link></td>
                        </tr>

                    ))
                }

            </tbody>
        </Table>
    )
}
