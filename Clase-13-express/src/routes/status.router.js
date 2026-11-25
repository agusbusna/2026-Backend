import express from 'express';

const statusRouter = express.Router()

//Controlador


statusRouter.get(
    '/ping', // GET /api/status/ping 
    (request, response) => {
        response.send(
            {
                ok: true,
                message: "Pong!"
            }
        )
    }

    )

statusRouter.get(
    '/', // GET /api/status/ping 
    (request, response) => {
        response.send(
            {
                ok: true,
            }
        )
    }

    )


export default statusRouter