var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

const EventEmitter = require('events');

var app = express();

let baseUrl = process.argv[2];

class StoryEmitter extends EventEmitter {};

const storyEmitter = new StoryEmitter();

storyEmitter.on('title', (data) => {
    console.log('Title: ' + data);
})

storyEmitter.on('author', (author) => {
    console.log('Author: ' + author);
})

storyEmitter.on('page', (page) => {
    console.log('Page: ' + page);

    buildUrls(page);
})

storyEmitter.on('body', (body) => {
    console.log('body: ' + 'body');
})

storyEmitter.on('')
function aquire(page) {
    let url = baseUrl + '?page=' + page;

    request(url, function(error, response, html){
        if(!error) {
            var $ = cheerio.load(html);

            $('.b-story-header').filter(function(){
                var data = $(this);

                storyEmitter.emit('title', data.children().first().text());
                storyEmitter.emit('author', 'test author');
            })

            $('.b-pager-caption-t').filter(function(){
                var data = $(this);

                storyEmitter.emit('page', data.text().replace(' Pages:', ''));
            })

            $('.b-story-body-x').filter(function(){
                var data = $(this);

                storyEmitter.emit('body', data.children().first().text(), page);
            })
        }
        else{
            console.log('Error: ' + error);
        }
    })
}

function getHeader(url){
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('.b-story-header').filter(function(){
                var data = $(this);

                storyEmitter.emit('title', data.children().first().text());
                storyEmitter.emit('author', data.children().next().children().text());
            })

            $('.b-pager-caption-t').filter(function(){
                var data = $(this);

                storyEmitter.emit('page', data.text().replace(' Pages:', ''));
            })
        }
        else {
            console.log('Error: ' + error);
        }
    })
}

function getBody(url){
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('.b-story-body-x').filter(function(){
                var data = $(this);

                storyEmitter.emit('body', data.children().first().text());
            })
        }
        else {
            console.log('Error: ' + error);
        }
    })
}

function buildUrls(numberOfPages){
    let urls = [];

    for(var i = 0; i < numberOfPages; i++){
        urls.push(baseUrl + '?page=' + (i+1));
    }

    return urls;
}

function saveToFile(text){
    fs.writeFile("/tmp/test.txt", text, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
}

if(baseUrl) {
    console.log(baseUrl);

    getHeader(baseUrl);
}