import express from 'express';
import * as sessionController from '../controllers/sessionController.js';

const router = express.Router();

console.log("Loading Session Routes...");
router.post('/dev/seed/test-session', (req, res, next) => {
    console.log("Hit seed endpoint!");
    sessionController.devSeedSession(req, res, next);
});
router.get('/user/:userId/role/:role', sessionController.getUserSessions);
router.post('/:sessionId/join', sessionController.joinSession);

router.get('/:sessionId', sessionController.getSession);
router.get('/candidate/:candidateId', sessionController.getSessionsByCandidate);
router.get('/expert/:expertId', sessionController.getSessionsByExpert);
router.post('/seed', sessionController.seedSession);
router.post('/', sessionController.createSession);

export default router;
