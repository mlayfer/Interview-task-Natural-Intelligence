import './App.css';
import React, { Component } from 'react';
import {VideosService} from "./services/videos/videos.service";
import nFormatter from "./utills/nFormatter";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            videosToShow: [],
            currentFilter: 'all'
        };

        VideosService.getVideos().then((videosRes) => {
            this.setState({videos: videosRes});
            this.setState({videosToShow: videosRes});
        });

        this.filterList = this.filterList.bind(this);
        this.manipulateVideoName = this.manipulateVideoName.bind(this);
        this.getVideoByType = this.getVideoByType.bind(this);

        this.setState.state = ({ width: 0, height: 0 });
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    filterList() {
        this.forceUpdate();
    }

    manipulateVideoName(videoName) {
        if (videoName && videoName.length>20 && (this.state.width < 600)) return (videoName.substring(0, 15) + '..');
        else return videoName;
    }

    getVideoByType(video) {
        let url;
        let result;
        if (video.source === 'url') return <video src={video.url} controls>Your browser does not support the video tag. </video>;
        else if (video.source === 'youtube') {
            console.log(video.videoId);
            if (video.videoId === 'notValid') {
                result = <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"></img>;
            } else {
                url = 'https://www.youtube.com/embed/' + video.videoId + '?controls=0';
                result = <iframe title={url} src={url}></iframe>;
            }

        }
        else if (video.source === 'facebook') {
            url = 'https://www.facebook.com/video/embed?video_id=' + video.videoId;
            result = <iframe title={url} src={url}></iframe>;
        }
        return result;
    }

    render() {
        if (document.getElementById("sourceFilter")) {
            const e = document.getElementById("sourceFilter");
            this.state.currentFilter = e.options[e.selectedIndex].value;
        }
        let Videos = this.state.videosToShow.map((video, index) => {
            console.log(video.source);
            console.log(this.state.currentFilter);
            if (video.title) {
                if ((this.state.currentFilter === 'all') || (video.source === this.state.currentFilter)) {
                    return <div className="chart-wrapper">
                        <div className="chart-header">
                            <div
                                className="chart-header-text left-text">{index + 1} - {this.manipulateVideoName(video.title)} </div>
                            <div className="chart-header-text right-text">{nFormatter(video.views, video.views.length)} Views
                            </div>
                        </div>
                        <div className="video-wrapper">{this.getVideoByType(video)}</div>
                    </div>
                }
            }
        });

        return (
            <div className="app-content">
                <div className="app-sticky-header">
                    <h1 className="app-title">Top10 Video Chart</h1>
                    <div className="filter">
                        <span>Filter By: </span>
                        <select id="sourceFilter" onChange={this.filterList}>
                            <option value="all" selected>All</option>
                            <option value="facebook">Facebook</option>
                            <option value="youtube">YouTube</option>
                            <option value="url">External URL</option>
                        </select>
                    </div>
                    <div id="videoItems">{Videos}</div>
                </div>
            </div>
        );
    }
}
