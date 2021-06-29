import axios from "axios";
import { CONNECTION_URL } from "./Url";


export default class AnswerService{
GetAnswersByQuestionId(questionId){
    return axios.get(`${CONNECTION_URL}/api/Answers/GetAnswersByQuestionId/${questionId}`)
}
GetProgressBar(questionId){
    return axios.get(`${CONNECTION_URL}/api/Answers/GetProgressBar/${questionId}`)
}
VoteAdd(answerData){
    return axios.post(`${CONNECTION_URL}/api/Answers/vote`,answerData);
}

}