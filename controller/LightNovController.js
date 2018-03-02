'use strict';

const AcquireService = require('../index').Service.AcquireService;
const SaveService = require('../index').Service.SaveService;

const Story = require('../model/index').Story;

class LightNovController {
    constructor(){
        this.story = new Story();
    }

    getStory(url){
        let classes = [
            '.block-title',
            '.chapter-content3'
        ];

        AcquireService.getStoryHtml(url, classes).then((data) => {
            SaveService.saveStoryToHTMLFile(1, data);
        });
    }
}

module.exports = LightNovController;