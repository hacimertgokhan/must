import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
const app = express()

import default_ from './get/default.js';

app.use(cors())
app.use(bodyParser.json())

export const error = (res, err, status) => {
    console.log(err)
    res.status(status).send(
        {
            data: err,
            type: 'Error',
            status: status
        }
    )
}

export const success = (res, success, status) => {
    console.log(success)
    res.status(status).send(
        {
            data: success,
            type: 'Success',
            status: status
        }
    )
}

app.use('/get', default_);

app.listen(8000, () => {
    console.log(`Server started at 8000`)
})