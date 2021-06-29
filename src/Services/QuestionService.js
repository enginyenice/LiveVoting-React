import axios from "axios";
import { CONNECTION_URL } from "./Url";


export default class QuestionService{
    GetQuestions(){
        return axios.get(`${CONNECTION_URL}/api/Questions`);
    }
    GetQuestionById(id){
        return axios.get(`${CONNECTION_URL}/api/Questions/${id}`)
    }
    CreateQuestion(question){
        return axios.post(`${CONNECTION_URL}/api/Questions`,question);
    }

}