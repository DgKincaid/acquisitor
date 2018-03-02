const util = require('util');
const fs = require('fs');
const cheerio = require('cheerio');

const writeFile = util.promisify(fs.writeFile);

class SaveService{
    constructor(){
        if(!SaveService.instance){
            SaveService.instance = this;
        }
        return SaveService.instance;
    }

    saveStoryToTextFile(story){

        let name = story.author + '-' + story.title + '.txt';
        let storyString = story.title + '\r\n' + story.author + '\r\n' + story.body.map((page) =>{
            return page.page + page.content;
        }).join();

       // console.log(storyString);

        writeFile('C:/tmp/' + name, storyString)
            .then(() => {
                console.log('save successful');
            })
    }

    saveStoryToHTMLFile(page, html){
        //let name = story.author + ' - ' + story.title + '.html';

        writeFile('C:/tmp/' + page + '-test.html', html)
            .then(() => {
                console.log('save successful');
            })
    }
}

const instance = new SaveService();
Object.freeze(instance);

module.exports = instance;