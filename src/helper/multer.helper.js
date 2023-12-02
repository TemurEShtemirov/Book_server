import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const allowedExtensions = [".jpg", ".jpeg", ".png"];

    if (allowedExtensions.includes(fileExtension.toLowerCase())) {
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    } else {
      cb(new Error("Invalid file format"));
    }
  },
});

const upload = multer({ storage });

export default upload;
