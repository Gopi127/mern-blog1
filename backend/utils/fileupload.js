const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

//! Configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage instance

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "jpeg"],
  params: {
    folder: "gopi-mern-project",
    format: "jpg",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
// cloudinary.v2.api.create_folder("gopi-mern-project").then(console.log);
module.exports = storage;
