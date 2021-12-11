const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'webp',
  'image/jpeg': 'webp',
  'image/png': 'webp',
  'image/webp': 'webp'
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/temp');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_') + Date.now();
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + '.' + extension);
  }
});

module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/((image)\/((jpg)|(jpeg)|(png)|(webp)))/)) {
      cb(null, true)
    } else {
      cb(new Error("Le format de l'image n'est pas accepté."), false)
    }
  }
})
.single('file');