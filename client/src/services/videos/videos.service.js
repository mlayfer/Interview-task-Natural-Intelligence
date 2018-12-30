import HttpService from "../http/basic/http.service";

export class VideosService {

    static getVideos() {
        return HttpService.get(`http://localhost:8000/videos`)
            .then((videos) => {
                return Promise.resolve(videos);
            });
    }
}
