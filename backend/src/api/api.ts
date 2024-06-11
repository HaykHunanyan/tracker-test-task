import { Router } from 'express'
import { Tracker } from '../controllers'

const router = Router()

router.get('/tracker', Tracker.GETTRACKER)
router.post('/track', Tracker.AddEVENTS)

module.exports = router
