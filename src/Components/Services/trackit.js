import axios from "axios";

const apiPath = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function registerUser(body) {
    return axios.post(`${apiPath}/auth/sign-up`, body)
}

function loginUser(body) {
    return axios.post(`${apiPath}/auth/login`, body)
}

function getTodayHabits(config) {
    return axios.get(`${apiPath}/habits/today`, config)
}

export {registerUser, loginUser, getTodayHabits};