const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/list');

router.get('/AllUserCards/:user_id', ctrl);
router.get('/CardsToRevise/:user_id', ctrl);
router.get('/TagedCards', ctrl);
router.get('/AllTags', ctrl);

module.exports = router;