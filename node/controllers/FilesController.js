// upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

const uploadDir = path.join(__dirname, 'assets');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Archivo no válido');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

export  default upload;
