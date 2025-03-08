const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mustaqeemali6764:uqiRtrDo3ASlHMmd@cluster0.zcxgj.mongodb.net/posts");

const FileSchema = new mongoose.Schema({
  name: String,
  driveId: String,
  url: String,
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", FileSchema);


