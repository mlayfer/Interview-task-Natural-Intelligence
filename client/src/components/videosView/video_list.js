import React from "react";
import {VideosService} from "./../../services/videos/videos.service";
import HttpService from "../../services/http/basic/http.service";


class VideoList extends React.Component {
    constructor(props, context) {
        super(props, context);

        VideosService.getVideos().then((videosRes) => {
            this.setState({videos: videosRes});
        });

    }

    static getSourceUrl(src, id) {
        if (src == 'youtube') return 'https://www.youtube.com/embed/' + id + '?controls=0';
        else if (src == 'facebook') return 'https://www.facebook.com/video/embed?video_id=' + id;
        else if (src == 'url') return id;
    }

    render() {
        return this.state.videos;
    }
}

export default VideoList;
