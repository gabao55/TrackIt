import axios from "axios";

const apiPath = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function registerUser(body) {
    return axios.post(`${apiPath}/auth/sign-up`, body)
}

function loginUser(body) {
    return axios.post(`${apiPath}/auth/login`, body)
}

function createHabit(body, config) {
    return axios.post(`${apiPath}/habits`, body, config)
}

function checkHabit(habitId,config) {
    return axios.post(`${apiPath}/habits/${habitId}/check`, {}, config)
}

function uncheckHabit(habitId, config) {
    return axios.post(`${apiPath}/habits/${habitId}/uncheck`, {}, config)
}

function getAllHabits(config) {
    return axios.get(`${apiPath}/habits`, config)
}

function getTodayHabits(config) {
    return axios.get(`${apiPath}/habits/today`, config)
}

function deleteHabit(habitId, config) {
    return axios.delete(`${apiPath}/habits/${habitId}`, config)
}

export {registerUser, loginUser, getTodayHabits, createHabit, checkHabit, uncheckHabit, getAllHabits, deleteHabit};