const express = require("express");
const pool = require("./pool");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const searchTerm = req.query.search;

  const allVideos = await pool.query(
    "SELECT * FROM videos WHERE t_name_video ILIKE $1",
    ["%" + searchTerm + "%"]
  );
  res.status(201).json(allVideos.rows);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const video = await pool.query(
    "UPDATE videos set i_num_views = i_num_views + 1 WHERE id=$1 RETURNING *",
    [id]
  );

  //if logged in, check to see if video is liked
  if (req.isAuthenticated()) {
    const username = req.user.t_name_user;
    const liked = await pool.query(
      "SELECT * FROM users WHERE t_name_user = $1 AND a_liked @> ARRAY[$2]::INT[]",
      [username, id]
    );

    if (liked.rowCount != 0) {
      // video is has already been liked by this user
      return res.status(201).json({ ...video.rows[0], liked: true });
    }
  }

  res.status(201).json({ ...video.rows[0], liked: false });
});

// liking videos
router.put("/:id", async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.end();
  }

  const { id } = req.params;
  const username = req.user.t_name_user;

  //add to liked videos for current user
  const user = await pool.query(
    `UPDATE users
      SET 
        a_liked = uniq(array_append(a_liked, $1))
      WHERE
        t_name_user = $2;
    `,
    [id, username]
  );

  //increment likes of video by 1
  const video = await pool.query(
    `UPDATE videos
      SET
        i_num_likes = i_num_likes + 1
      WHERE
        id = $1;
    `,
    [id]
  );
});

module.exports = router;
