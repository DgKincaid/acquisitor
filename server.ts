import { LightNovController, LiteController } from './controller/index';

const baseUrl = process.argv[2];

function init() {
    if(baseUrl.includes('lite')){
        let Lite = new LiteController();

        Lite.getStory(baseUrl);
    }
    else if(baseUrl.includes('lightnovel')) {
        let light = new LightNovController();

        light.getStory(baseUrl);
    }
};

if(baseUrl) {
    init();
}