const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  const { imageUrl } = req.body;

  // CASE 1: External URL pasted
  if (imageUrl) {
    return res.json({ url: imageUrl });
  }

  // CASE 2: Base64 upload
  const result = await cloudinary.uploader.upload(req.body.image, {
    folder: "innovativehub",
  });

  res.json({ url: result.secure_url });
};
