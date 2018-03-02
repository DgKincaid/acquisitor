'use strict';

const cheerio = require('cheerio');
const fs = require('fs');

const AcquireService = require('../index').Service.AcquireService;
const SaveService = require('../index').Service.SaveService;

const Story = require('../model/index').Story;

class LiteController {
    constructor() {
        this.story = new Story();
    }

    populateStory(page){
        let $ = cheerio.load(page);

        $('.b-story-header').filter((i, el) => {
            let data = $(el);
            
            this.story.title = data.children().first().text();
        })

        $('.b-story-body-x').filter((i, el) => {
            let data = $(el);

            this.story.body.push({ page: 1, content: data.children().first().text()});
        })
        
        $('.b-story-user-y').filter((i, el)=>{
            let data = $(el);

            this.story.author = data.text();
        })

        $('.b-pager-caption-t').filter((i, el) => {
            let data = $(el);
            this.story.pages = data.text().replace(' Pages:', '');
        })
        //SaveService.saveStoryToHTMLFile('', page);
    }

    populateBody(url, pageNumber){
        let classes = [
            '.b-story-body-x'
        ];

        AcquireService.getStoryHtml(url, classes).then((page) =>{
            let $ = cheerio.load(page);

            $('.b-story-body-x').filter((i, el) => {
                let data = $(el);
                this.story.body.push({ page: pageNumber, content: data.children().first().text()});
                console.log(this.story.body);
            })
            //SaveService.saveStoryToHTMLFile(pageNumber, page);
        });
    }

    getStory(url){
        console.log('Lite Get Story');
        let classes = [
            '.b-story-header',
            '.b-story-body-x',
            '.b-pager-pages'
        ];

        AcquireService.getStoryHtml(url, classes).then((data) =>{
            this.populateStory(data);

        }).then(() =>{
            for(let i = 2; i <= this.story.pages; i++){
                let newUrl = url + '?page=' + i;

                this.populateBody(newUrl, i);
            }
        }).then(() =>{
            SaveService.saveStoryToTextFile(this.story);
        });
    }
}

module.exports = LiteController;