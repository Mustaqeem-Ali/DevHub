const express = require("express");
const multer = require("multer");
const { google } = require("googleapis");
const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

// Multer Storage Configuration (Fixes Errors)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure "uploads" folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Load Google Drive Credentials
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_DRIVE_KEY_FILE, // Use environment variable
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

// MongoDB Connection (Ensure connection before saving)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define File Schema
const FileSchema = new mongoose.Schema({
  name: String,
  driveId: String,
  url: String,
});

const File = mongoose.model("File", FileSchema);

// Upload API (Handles Errors)
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    
    const fileMetadata = {
      name: req.file.originalname,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Use env variable
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    // Upload file to Google Drive
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    // Make file public
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: { role: "reader", type: "anyone" },
    });

    // File URL
    const fileUrl = `https://drive.google.com/file/d/${response.data.id}/view`;

    // Save file details to MongoDB
    const newFile = new File({
      name: req.file.originalname,
      driveId: response.data.id,
      url: fileUrl,
    });

    await newFile.save();

    // Delete file from server after upload
    fs.unlinkSync(req.file.path);

    res.json({ success: true, fileUrl });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});


//API to get the files
app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to retrieve files" });
  }
});
//api to delete the data from the mongodb
app.delete("/delete/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    // Delete from Google Drive
    await drive.files.delete({ fileId });

    // Delete from MongoDB
    await File.findOneAndDelete({ driveId: fileId });

    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to delete file" });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
