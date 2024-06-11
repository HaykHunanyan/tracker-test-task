import { Schema, model, Document } from 'mongoose'

interface ITrackEvent extends Document {
    event: string
    tags: string[]
    url: string
    title: string
    ts: number
}

const trackEventSchema = new Schema<ITrackEvent>({
    event: { type: String, required: true },
    tags: { type: [String], required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    ts: { type: Number, required: true }
})

const TrackEvent = model<ITrackEvent>('TrackEvent', trackEventSchema)

export { TrackEvent, ITrackEvent }
