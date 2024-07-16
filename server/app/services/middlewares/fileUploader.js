const multer = require("multer");

// Configuration de Multer pour utiliser diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Chemin de destination des fichiers uploadés
    cb(null, "public/assets/videos/");
  },
  filename: (req, file, cb) => {
    // Construire le nom du fichier avec son nom d'origine et l'extension d'origine, autrement le fichier ne possède pas d'extension
    // le Date.now() permet de renommer le fichier afin qu'ils soient tous unique, c'est une façon simple de s'assurer de l'unicité des fichiers
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadVideo = (req, res, next) => {
    if (req.file) {
      const video = req.file;
      const currentDate = new Date(Date.now()).toISOString();
      const formattedDate = currentDate.split("T")[0];
      req.body.video_url = video.filename;
      req.body.upload_date = formattedDate;

      next();
    } else {
      res.status(400).send("No video uploaded.");
    }
};

const uploadImage = (req, res, next) => {
  if (req.file) {
    const image = req.file;
    console.info(image);
    req.body.img_url = image;
    next();
  } else {
    res.status(400).send("No image uploaded.");
  }
};

module.exports = {
  storage,
  uploadVideo,
  uploadImage,
};
