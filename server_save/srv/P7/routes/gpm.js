const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const gpm = require('../controllers/gpm');

router.get('/depts', gpm.setFct, gpm.sendIt);
router.get('/lastAnnonce', auth, gpm.setFct, gpm.sendIt);
router.get('/lastArticles', auth, gpm.setFct, gpm.sendIt);
router.get('/groupeList', auth, gpm.setFct, gpm.sendIt);

router.get('/groupe/:groupe', auth, gpm.setFct, gpm.sendIt);
router.post('/groupe/create', multer, auth, gpm.setFct, gpm.sendIt);
router.get('/groupe/:groupe/member', auth, gpm.setFct, gpm.sendIt);
router.get('/groupe/:groupe/commSignaled', auth, gpm.setFct, gpm.sendIt);
router.put('/groupe/grant', auth, gpm.setFct, gpm.sendIt);
router.delete('/groupe/:groupe', auth, gpm.setFct, gpm.sendIt);

router.get('/participation/:participationId', auth, gpm.setFct, gpm.sendIt);
router.post('/participation/create', multer, auth, gpm.setFct, gpm.sendIt);
router.get('/participation/:participationId/member', auth, gpm.setFct, gpm.sendIt);
router.put('/participation/:participationId/grant', auth, gpm.setFct, gpm.sendIt);
router.delete('/participation/:participationId', auth, gpm.setFct, gpm.sendIt);

router.get('/participation/:participationId/commentaire', auth, gpm.setFct, gpm.sendIt);
router.post('/participation/:participationId/commentaire', multer, auth, gpm.setFct, gpm.sendIt);
router.delete('/participation/:participationId/commentaire', auth, gpm.setFct, gpm.sendIt);

router.put('/commentaire/signal', auth, gpm.setFct, gpm.sendIt);

module.exports = router;