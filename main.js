const Controller = require('./controller/index');

// Controllers
const LiteController = Controller.LiteController;
const LightNovController = Controller.LightNovController;

const baseUrl = process.argv[2];

init = () => {
    if(baseUrl.includes('lite')){
        let Lite = new LiteController();

        Lite.getStory(baseUrl);
    }
    else if(baseUrl.includes('lightnovel')) {
        let light = new LightNovController();

        light.getStory(baseUrl);
    }
}

if(baseUrl) {
   init();
}