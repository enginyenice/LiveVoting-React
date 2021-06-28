import axios from "axios";


export default class AnswerService{
GetAnswersByQuestionId(questionId){
    return axios.get(`https://localhost:44373/api/Answers/GetAnswersByQuestionId/${questionId}`)
}
GetProgressBar(questionId){
    return axios.get(`https://localhost:44373/api/Answers/GetProgressBar/${questionId}`)
}

}