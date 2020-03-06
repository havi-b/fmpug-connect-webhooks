const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/lyrics', async (req, res) => {
  let string = req.body.string;

  let result = string.match(/([A-Z]|\s)*\s(-)\s([A-Z]|\s)*/i);
  if (!result) return res.status(400).json({ error: 'Invalid input!' });

  let array = string.split(' - ');
  let song = array[0];
  let artist = array[1];

  axios
    .get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then(response => {
      res.send(response.data.lyrics);
    })
    .catch(err =>
      res.status(400).json({ error: 'Sorry... Lyrics not available...' })
    );
});

module.exports = router;
