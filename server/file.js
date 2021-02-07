const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("./pool");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const router = express.Router();

// Only allow file to upload if logged in
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Please login." });
  }
};

router.use(checkAuthenticated);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/videos");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const generateThumbnail = (req, res, next) => {
  // req.file
  // {
  //   fieldname: 'file',
  //   originalname: 'sorry.mp4',
  //   encoding: '7bit',
  //   mimetype: 'video/mp4',
  //   destination: 'public/videos',
  //   filename: '1604904740237.mp4',
  //   path: 'public/videos/1604904740237.mp4',
  //   size: 4236260
  // }

  const filename = req.file.filename.split(".")[0] + ".png";

  var proc = new ffmpeg(req.file.path).takeScreenshots(
    {
      count: 1,
      timemarks: ["1"], // number of seconds
      filename: filename,
    },
    "./public/thumbnails",
    function (err) {
      console.log("screenshots were saved");
    }
  );

  next();
};

router.post(
  "/upload",
  upload.single("file"),
  generateThumbnail,
  async (req, res, next) => {
    const { name, desc } = req.body;
    const username = req.user.t_name_user;
    const url =
      req.protocol +
      "://" +
      req.get("host") +
      "/videos" +
      "/" +
      req.file.filename;
    const thumbUrl =
      req.protocol +
      "://" +
      req.get("host") +
      "/thumbnails" +
      "/" +
      req.file.filename.split(".")[0] +
      ".png";
    const currentDate = new Date();

    try {
      const newVideo = await pool.query(
        "INSERT INTO videos (t_name_user, t_name_video, t_desc, t_url, t_thumb_url, d_upload_date, i_num_views) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [username, name, desc, url, thumbUrl, currentDate, 0]
      );

      if (newVideo.rowCount) {
        res.status(201).json({ message: "File uploaded successfully." });
      }
    } catch (err) {
      throw err;
    }
  }
);

module.exports = router;
