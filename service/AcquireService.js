const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');

class AcquireService{
    constructor(){
        if(!AcquireService.instance){
            AcquireService.instance = this;
        }

        return AcquireService.instance;
    }

    getStoryHtml(url, classList){
        let options = {
            url,
            transform: function(body){
                return cheerio.load(body);
            }
        }

        return new Promise(function(resolve, reject){
            request(options).then(function($){
                let newPage = cheerio.load('<div id="content"></div>');

                classList.forEach(element => {
                    $(element).filter(function(){
                        let data = $(this);

                        newPage(data.html()).appendTo('#content');
                    })
                });

                resolve(newPage.html());
            })
            .catch(function(err){
                console.log('Error: ' + err);
            })
        })
        
       
    }
}

const instance = new AcquireService();
Object.freeze(instance);

module.exports = instance;