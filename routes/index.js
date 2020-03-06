const express = require('express');
const router = express.Router();

const axios = require('axios');

router.post('/lyrics', async (req, res) => {
  let string = req.body.search;

  if (
    !string ||
    !req.body.search.match(/\!lyrics\s([A-Z]|\s)*\s(-)\s([A-Z]|\s)*/i)
  )
    return res.status(400).json({
      error: {
        errors: [
          {
            domain: 'global',
            reason: 'Invalid input',
            message: `Invalid search: ${string}`,
            locationType: 'body',
            location: 'body.search'
          }
        ],
        code: 400,
        message: `Invalid search: ${string}`
      }
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
        error: {
          errors: [
            {
              domain: 'global',
              reason: 'not found',
              message: `Sorry... Lyrics not available for ${string}`,
              locationType: 'body',
              location: 'body.search'
            }
          ],
          code: 400,
          message: `Sorry... Lyrics not available for ${string}`
        }
      })
    );
});

router.get('/test', (req, res) => {
  res.json({ data: 'All is well!', success: true });
});

module.exports = router;
