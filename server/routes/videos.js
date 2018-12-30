const express = require('express');
const router = express.Router();
const {videos} = require("../dal/videos");
const axios = require('axios');

router.get('/', function(req, res, next) {
    let existVideos = [];
    videos.forEach(function(video, index) {
            async function go() {
                try {
                    if (video.source == 'youtube') {
                        const result = await axios.get('https://www.googleapis.com/youtube/v3/videos?part=id&id=' + video.videoId + '&key=AIzaSyAVJCH2tWco8zwQy9HfY6_rluChI7DQAlw')
                        if (result.data.pageInfo.totalResults > 0) existVideos.push(video);
                    } else existVideos.push(video);
                        if (index == videos.length-1) {
                            res.send(existVideos);
                        }
                } catch (e) {
                    console.error(e);
                }
            }
            go();
        })
    });

module.exports = router;
