const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/list');

router.get('/:fctName/:user_id', ctrl);

router.post('/:fctName', ctrl);

module.exports = router;