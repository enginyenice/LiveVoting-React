import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Message from './Message';
import QuestionList from '../Pages/QuestionList';
import { Route } from "react-router-dom";
import QuestionDetail from '../Pages/QuestionDetail';
import CreateQuestion from '../Pages/CreateQuestion';
import Footer from './Footer';
export default function Dashboard() {
    return (
        <div>
            <Menu />
            <Container>
                <Message></Message>
                <Route exact path="/" component={QuestionList} />
                <Route exact path="/questions" component={QuestionList} />
                <Route path="/questions/:id" component={QuestionDetail} />
                <Route path="/createquestion" component={CreateQuestion} />
                <Footer/>
            </Container>
        </div>
    )
}
