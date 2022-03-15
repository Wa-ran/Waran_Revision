const express = require('express');
const router = express.Router();
// const auth = require('../middlewares/auth');
const ctrl = require('../controllers/controller');

router.get('/:fctName/:object/:id', ctrl);
router.post('/:fctName', ctrl)
router.put('/:fctName', ctrl);
router.delete('/:fctName/:object/:id', ctrl);


// router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);
// router.put('/putInfos', userCtrl.putInfos);
// router.put('/putEmail', userCtrl.putEmail);
// router.put('/putPass', userCtrl.putPass);
// router.post('/avatar', multer, auth, userCtrl.avatar);
// router.delete('/delete', userCtrl.delete);

module.exports = router;