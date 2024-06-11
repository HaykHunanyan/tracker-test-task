import { Request, Response, NextFunction } from 'express'

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

export default corsMiddleware