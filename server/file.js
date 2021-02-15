const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("./pool");
const aws = require("aws-sdk");

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const router = express.Router();

// Only allow file to upload if logged in
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    next();
  } else {
    console.log("req.user wasnt defined!");
    res.status(401).json({ message: "Please login." });
  }
};

// require login to upload
router.use(checkAuthenticated);

const S3_BUCKET = process.env.AWS_BUCKET;
// get signature for file upload
router.get("/signature", (req, res) => {
  const s3 = new aws.S3();
  const fileName =
    "videos/" + Date.now() + path.extname(req.query["file-name"]);
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 600,
    ContentType: fileType,
    ACL: "public-read",
  };

  console.log("Params:" + s3Params);

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      return res.end();
    }
    const returnData = {
      signature: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    res.write(JSON.stringify(returnData));
    res.end();
  });
});

router.post(
  "/upload",
  async (req, res, next) => {
    console.log("Saving info into database");
    const { name, desc, url } = req.body;
    const username = req.user.t_name_user;
    const thumbUrl = url.replace(/\.\w+$/, `.jpg`);
    const currentDate = new Date();

    try {
      const newVideo = await pool.query(
        "INSERT INTO videos (t_name_user, t_name_video, t_desc, t_url, t_thumb_url, d_upload_date, i_num_views, i_num_likes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [username, name, desc, url, thumbUrl, currentDate, 0, 0]
      );

      if (newVideo.rowCount) {
        res.status(200).json({ message: "File uploaded successfully." });
      }
    } catch (err) {
      throw err;
    }
  }
);

module.exports = router;
