const base = require('@playwright/test');

exports.test = base.test.extend({
  configureEnv: [async (_, use) => {
    const roomIDsStr = process.env.room_ids;
    if (roomIDsStr) {
        const roomIds = roomIDsStr.split(",");
        const roomId = roomIds[process.env.TEST_PARALLEL_INDEX];
        const baseUrl = process.env.base_url;

        const getUrl = (role) => {
            return baseUrl + "/" + roomId + "/" + role;
        }

        process.env.audio_url = getUrl("audio");
        process.env.audio_video_url = getUrl("audio-video");
        process.env.audio_video_screenshare_url = getUrl("audio-video-screenshare");
        process.env.screen_share_url = getUrl("screenshare");
        process.env.video_url = getUrl("video");
        process.env.viewer_url = getUrl("viewer");
        process.env.hls_viewer_url = getUrl("hls-viewer");
    }

    await use(); // run the test
  }, { auto: true }],
});