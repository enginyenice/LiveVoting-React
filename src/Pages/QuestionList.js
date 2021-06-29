import React, { useState, useEffect } from 'react'
import QuestionService from '../Services/QuestionService'
import { Table, Button,Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function QuestionList() {
    const [questions, setQuestions] = useState([])
const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let questionService = new QuestionService()
        questionService.GetQuestions().then((result) => {
            var pureData = result.data;
            setQuestions(pureData.data);
            setIsLoading(true);

        })
    }, [])

    return (
        <>
        
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th colSpan={3}> En çok katılım sağlanan 10 oylama </th>
                </tr>
                <tr>
                    <th>Soru</th>
                    <th>Katılım Sayısı</th>
                    <th>Oylamaya katıl</th>
                </tr>
            </thead>
            <tbody>
                {
                    isLoading === false && (
                        <tr>
                            <td colSpan={3} className="text-center">
                            <Spinner animation="border" variant="info" />
                            </td>
                        </tr>
                    )
                }
                {
                    questions.map((question) => (

                        <tr key={question.id}>
                            <td>{question.title}</td>
                            <td>{question.total}</td>
                            <td><Link
                            to={`/questions/${question.id}`}
                            ><Button variant="primary">Oylamaya Katıl</Button>{' '}</Link></td>
                        </tr>

                    ))
                }

            </tbody>
        </Table>

        </>
    )
}
