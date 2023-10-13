import axios from "axios";
import { CONFIG } from "../config/config.js"
import { _status } from "../utils/helpers.js";

export const customController = {


    getAll: async (req, res) => {
        try {
            const response = await axios.get(req.url);
            console.log(response.data)
            res.status(201).send(response.data)
        } catch (error) {
            res.status(500).json(_status(false, true, error))
        }
    },

    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await axios.get(req.url + id);
            res.status(201).json(response.data)
        } catch (error) {
            res.status(500).json(_status(false, true, error))
        }
    },

    create: async (req, res) => {
        try {
            const response = await axios.post(req.url, req.body);
            console.log(response.data)
            res.status(201).json(response.data ?? _status(true, false, 'Record created successfully'))
        } catch (error) {
            res.status(500).json(_status(false, true, error))
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await axios.patch(req.url + id, req.body);
            res.status(201).json(response.data)
        } catch (error) {
            res.status(500).json(_status(false, true, error))
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const response = await axios.delete(req.url + id);
            res.status(201).json(_status(true, false, 'Record deleted successfully'))
        } catch (error) {
            res.status(500).json(_status(false, true, error))
        }
    },
}