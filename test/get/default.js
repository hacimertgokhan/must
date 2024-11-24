import express from "express";
import {error, success} from "../tests.js";

const router = express.Router();
router.get('/default', async (req, res) => {
    try {
        return success(res, "This is default response.", 200)
    } catch (e) {
        return error(res, e.toString(), 500)
    }
})

export default router;