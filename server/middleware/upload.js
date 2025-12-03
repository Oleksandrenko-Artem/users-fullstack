const path = require('path');
const multer = require('multer');
const { STATIC_PATH } = require('./../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter (req, file, cb) {
  // image/gif, image/jpef, image/png
  const MIMETYPE_REG_EXP = /^image\/(gif|jpeg|png)$/;

  cb(null, MIMETYPE_REG_EXP.test(file.mimetype)); // cb(null, чи_зберігати)
}

const upload = multer({ storage, fileFilter });

module.exports.uploadUserPhoto = upload.single('userPhoto');
