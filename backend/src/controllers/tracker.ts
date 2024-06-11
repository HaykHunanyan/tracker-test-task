import { validateEvents } from '../validate'
import { TrackEvent } from '../models/TrackEvent'
import path from 'path'
import { Request, Response } from 'express'

export const Tracker = {
    AddEVENTS: async (req: Request, res: Response) => {
        const events = req.body
        if (!validateEvents(events)) {
            return res.status(422).send('Unprocessable Entity')
        }
        try {
            await TrackEvent.insertMany(events)
            res.status(200).send('OK')
        } catch (error) {
            console.error('Error inserting events:', error)
            res.status(500).send('Internal Server Error')
        }
    },
    GETTRACKER: async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/javascript')
        res.sendFile(path.join(__dirname, '../../dist', 'tracker.js'))
    }
}
