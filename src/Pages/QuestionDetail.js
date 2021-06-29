import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import QuestionService from '../Services/QuestionService'
import AnswerService from '../Services/AnswerService'
import { Card, Button, ProgressBar,Spinner } from 'react-bootstrap'
import { HubConnectionBuilder } from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    LivejournalIcon,
    TwitterIcon
} from "react-share";
import { CONNECTION_URL } from '../Services/Url';
const publicIp = require('public-ip');

export default function QuestionDetail() {
    const history = useHistory()
    let { id } = useParams();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [answersProgress, setAnswersProgress] = useState([]);
    const [connection, setConnection] = useState(null)
    const [url, setUrl] = useState()
    const [sharedText, setSharedText] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setUrl(window.location.href);
        let questionService = new QuestionService();
        questionService.GetQuestionById(id).then((result) => {
            if(result.data.errors !== null){
                history.push(`/questions`);
            }
            setQuestion(result.data.data);
            

        });

        let answerService = new AnswerService();
        answerService.GetAnswersByQuestionId(id).then((result) => {
            setAnswers(result.data.data);
        });

        answerService.GetProgressBar(id).then((result) => {
            setAnswersProgress(result.data.data);
            setIsLoading(true);
        });

    }, [id,history]);

    useEffect(() => {
        setSharedText(`**${question.title}** \n sorusu hakkında bir oylama başlattık. Sen bu konuda ne düşünüyorsun ? \n Tıkla ve oyla`);
    }, [question])
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${CONNECTION_URL}/MyHub`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    connection.invoke("AddToGroup", id);
                    connection.on('ReceiveProgressBar', message => {
                        setAnswersProgress(message.data);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection, id]);

    const VoteAdd = async (id) => {
        let ipAdress = await publicIp.v4();
        let answerId = id;
        let postData = {
            "id": answerId,
            "ipAdress": ipAdress
        }
        let answerService = new AnswerService()
        answerService.VoteAdd(postData).then((result) => {
            if (result.data.errors !== null) {
                toast.error(`${result.data.errors.map(p => p)}`);

            }
            if (result.data.errors === null) {
                toast.success(`Oyunuz başarıyla alındı. Oylamaya katıldığınız için teşekkür ederiz.`);

            }
        });
    }
    const CopyClick = async () => {
        await navigator.clipboard.writeText(url);
        toast.success(`Harika... Link kopyalandı. İstediğin yere kolaylıkla yapıştırabilirsin`);
    }

    return (
        <>
            <ToastContainer />
            <Card>
                <Card.Header>
                    {
                        isLoading === false && (
                            <Spinner animation="border" variant="info" />
                        )
                    }
                    {
                        isLoading === true && (
                            <h4><b> {question.title}</b></h4>
                        )
                    }
                    
                    </Card.Header>
                <Card.Body>
                    {
                        isLoading === false && (
                            <div className="text-center"><Spinner animation="border" variant="info" /></div>
                        )
                    }
                    {
                       isLoading === true && answers.map((answer) => (
                            <Button key={answer.id} variant="primary m-2" onClick={() => VoteAdd(answer.id)} >{answer.title}</Button>
                        ))
                    }
                </Card.Body>
            </Card>
            <Card className="mt-2">
                <Card.Header><h4><b>Sonuçlar</b></h4></Card.Header>
                <Card.Body>
                {
                    
                        isLoading === false && (
                            <div className="text-center"><Spinner animation="border" variant="info" /></div>
                        )
                    }
                    {
                        isLoading === true && answersProgress.map((answerProggress) => (
                            <div key={answerProggress.id}>
                                <h5>{answerProggress.title} - {answerProggress.percent}%</h5>
                                <span className="text-muted">Oy veren kişi sayısı: {answerProggress.vote}</span>

                                <ProgressBar variant="success" animated now={answerProggress.percent} label={`${answerProggress.percent}%`} />
                                <hr />
                            </div>
                        ))
                    }
                </Card.Body>
                <Card.Footer>

                    <FacebookShareButton url={url} quote={sharedText} className="m-2">
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={url} title={sharedText} className="m-2">
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <LinkedinShareButton url={url} className="m-2">
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <EmailShareButton url={url} subject="Oylamaya katılır mısın" body={sharedText} className="m-2">
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                    <LivejournalIcon size={32} round  onClick={() => CopyClick()} className="m-2" style={{cursor:"pointer"}}/>

                </Card.Footer>
            </Card>
        </>
    )
}
