const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const ctrl = require('../controllers/card');

router.get('/', ctrl);

router.post('/', ctrl);

router.put('/', ctrl);

router.delete('/', ctrl);

module.exports = router;