import axios from "axios"
import { CONFIG_FRONT } from "../config"
import { getToken, getUserInfo } from "./auth.service"

export const getTasks = async () => {
    const { id } = getUserInfo()
    const response = await axios.get(`${CONFIG_FRONT.API_URL}/api/users/${id}/todos`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return response.data
}

export const getTasksById = async (id) => {
    const response = await axios.get(`${CONFIG_FRONT.API_URL}/api/todos/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return response.data
}

export const createTask = async (data) => {
    const response = await axios.post(`${CONFIG_FRONT.API_URL}/api/todos`,
        data,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    return response.data
}

export const updateTaskById = async (id, data) => {
    const response = await axios.patch(`${CONFIG_FRONT.API_URL}/api/todos/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
    return response.data
}