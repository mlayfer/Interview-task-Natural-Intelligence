import VideoList from './components/videosView/video_list';
import nFormatter from './utills/nFormatter';

const assert = require('assert');

describe("Source URL", () => {
    it('should return youtube source', function() {
        const sourceVideo = VideoList.getSourceUrl('youtube', '123123');
        assert.equal(sourceVideo, `https://www.youtube.com/embed/123123?controls=0`);
    });
    it('should return facebook source', function() {
        const sourceVideo = VideoList.getSourceUrl('facebook', '123123');
        assert.equal(sourceVideo, `https://www.facebook.com/video/embed?video_id=123123`);
    });
    it('should return external url source', function() {
        const sourceVideo = VideoList.getSourceUrl('url', 'https://external-url.com');
        assert.equal(sourceVideo, `https://external-url.com`);
    });
});

describe("nFormatter", () => {
    it('should return the shortcut string of a number - Mega', function() {
        const stringNumber = nFormatter('1000000');
        assert.equal(stringNumber, '1M');
    });
    it('should return the shortcut string of a number - Kilo', function() {
        const stringNumber = nFormatter('100000');
        assert.equal(stringNumber, '100k');
    });
    it('should return the shortcut string of a number', function() {
        const stringNumber = nFormatter('10');
        assert.equal(stringNumber, '10');
    });
});
