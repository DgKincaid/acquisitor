'use strict';
const cheerio = require('cheerio');

const AcquireService = require('../index').Service.AcquireService;
const SaveService = require('../index').Service.SaveService;

const Story = require('../model/index').Story;

class LightNovController {
    constructor(){
        this.story = new Story();
    }

    populateStory(data){
        let $ = cheerio.load(data);
        let i = 0;

        $('p').filter((i, el) => {
            let data = $(el);
            this.story.body.push({page: i, content: data.text()})
        })
    }

    getStory(url){
        let classes = [
            '.block-title',
            '.chapter-content3'
        ];

        this.story.author = ''
        this.story.title = 'Zhanxian - Chapter 1';
        
        AcquireService.getStoryHtml(url, classes).then((data) => {
            this.populateStory(data);
            
        }).then(() => {
            SaveService.saveStoryToTextFile(this.story);
        });
    }
}

module.exports = LightNovController;