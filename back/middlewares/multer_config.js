const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const chunks = name.split('.');
    chunks.pop();
    const extension = MIME_TYPES[file.mimetype];
    callback(null, chunks.join('_') + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');