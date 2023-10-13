import axios from "axios"
import { CONFIG_FRONT } from "../config"

export const login = async ({ username, email }) => {
    const response = await axios.post(`${CONFIG_FRONT.API_URL}/api/users/auth/login`, { username, email })
    return response
}

export const getToken = () => {
    let session = null;
    let token = ''
    if (localStorage.session != undefined) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        session = JSON.parse(localStorage.session);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        token = session.token;
    }
    return token
}

export const getUserInfo = () => {
    let session = null;
    let userInfo = ''
    if (localStorage.session != undefined) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        session = JSON.parse(localStorage.session);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        userInfo = session.userInfo;
    }
    return userInfo
}


export const validateToken = async () => {
    return new Promise((resolve, reject) => {
        if (getToken() == "") {
            window.location.href('/')
            reject(false)
        } else {
            resolve(true)
        }
    })

}
