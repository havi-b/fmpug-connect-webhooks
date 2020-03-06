const express = require('express');
const router = express.Router();

const axios = require('axios');

router.post('/lyrics', async (req, res) => {
  let string = req.body.string;

  let result = req.body.string.match(
    /\!lyrics\s([A-Z]|\s)*\s(-)\s([A-Z]|\s)*/i
  );
  if (!result)
    return res.status(400).json({
      status: 400,
      message: 'Invalid input!',
      search: string,
      success: false
    });
  string = string.split('!lyrics ')[1];
  let array = string.split(' - ');
  let song = array[0];
  let artist = array[1];

  axios
    .get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(err =>
      res.status(400).json({
        status: 400,
        message: 'Sorry... Lyrics not available...',
        search: string,
        success: false
      })
    );
});

router.get('/test', (req, res) => {
  res.json({ data: 'All is well!', success: true });
});

module.exports = router;
