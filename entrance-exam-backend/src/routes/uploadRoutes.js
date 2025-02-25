// const express = require("express");
// const multer = require("multer");
// const { uploadImage } = require("../config/uploadthing");

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const imageUrl = await uploadImage(req.file.buffer, req.file.originalname);
//     res.json({ message: "Upload successful", url: imageUrl });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
