const Controller = require('./controller/index');

// Controllers
const LiteController = Controller.LiteController;

const baseUrl = process.argv[2];

init = () => {
    if(baseUrl.includes('lite')){
        let Lite = new LiteController();

        Lite.getStory(baseUrl);
    }
}

if(baseUrl) {
   init();
}