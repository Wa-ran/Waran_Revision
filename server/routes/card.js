const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const cardCtrl = require('../controllers/card');

router.get('/oneCard', cardCtrl.getOneCard);
router.get('/allUserCards', cardCtrl.getAllUserCards);

router.post('/oneCard', cardCtrl.postOneCard);

router.put('/oneCard', cardCtrl.putOneCard);

router.delete('/oneCard', cardCtrl.deleteOneCard);

module.exports = router;