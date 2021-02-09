const express = require("express");
const pool = require("./pool");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const searchTerm = req.query.search;
  console.log(searchTerm);

  const allVideos = await pool.query(
    "SELECT * FROM videos WHERE t_name_video ILIKE $1",
    ["%" + searchTerm + "%"]
  );
  res.status(201).json(allVideos.rows);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const video = await pool.query(
    "UPDATE videos set i_num_views = i_num_views + 1 WHERE id=$1 RETURNING *",
    [id]
  );
  res.status(201).json(video.rows[0]);
});

module.exports = router;
