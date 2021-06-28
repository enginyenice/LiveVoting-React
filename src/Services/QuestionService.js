import axios from "axios";


export default class QuestionService{
    GetQuestions(){
        return axios.get("https://localhost:44373/api/Questions");
    }
    GetQuestionById(id){
        return axios.get(`https://localhost:44373/api/Questions/${id}`)
    }

}