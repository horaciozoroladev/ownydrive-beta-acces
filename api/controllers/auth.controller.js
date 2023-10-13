import axios from "axios";
import { generateToken } from "../middlewares/auth.middleware.js    ";
import moment from "moment"
import { CONFIG } from "../config/config.js";
import { _status } from "../utils/helpers.js";

export const authController = {
    /* The `login` function is an asynchronous function that handles the logic for user login. */
    login: async (req, res) => {
        const { username, email } = req.body;

        const response = await axios.get(req.url);

        const data = [...response.data]

        if (data.length == 0) {
            res.status(500).json(_status(false, true, 'Users not found'))
        } else {

            const user = data.filter(d => d.username == username && d.email == email)[0];

            if (user) {
                const expTime = moment(Date.now()).add(CONFIG.TOKEN_EXP_TIME, CONFIG.TOKEN_EXP_TYPE).toDate();

                const token = await generateToken({
                    id: user.id,
                    username: user.username,
                    exp: expTime.getTime()
                })

                res.status(200).json({
                    userInfo: user,
                    token: token
                })
            } else {
                res.status(500).json(_status(false, true, 'Credentials for this User not found'))
            }
        }
    },

    /* The `logout` function is an asynchronous function that handles the logic for user logout. */
    logout: async (req, res) => {
        const { username, email } = req.body;

        const response = await axios.get(req.url);

        const data = [...response.data]

        if (data.length == 0) {
            res.status(500).json(_status(false, true, 'Users not found'))
        } else {
            const user = data.filter(d => d.username == username && d.email == email)[0];
            if (user) {
                res.status(200).json(_status(true, false, 'Logged out successfully'))
            } else {
                res.status(500).json(_status(false, true, 'Credentials for this User not found'))
            }
        }
    }
}