import {Request, Response, NextFunction} from "express";

const tokenVerification = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const tokenFromEnv = "Bearer " + process.env.API_TOKEN;

    if(req.method !== 'GET' && token !== tokenFromEnv) {
        res.status(401);
        res.end();
    }

    next();
};

module.exports = tokenVerification;
