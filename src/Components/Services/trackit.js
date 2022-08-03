import axios from "axios";

const apiPath = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/";

function registerUser(body) {
    return axios.post(`${apiPath}auth/sign-up`, body)
}

export {registerUser};