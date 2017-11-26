var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

const StorySchema = require('./story');
const EventEmitter = require('events');

var app = express();

let baseUrl = process.argv[2];
let calls = 0;

class StoryEmitter extends EventEmitter {};

const storyEmitter = new StoryEmitter();

let Story = StorySchema;

storyEmitter.on('title', (title) => {
    Story.title = title;
})

storyEmitter.on('author', (author) => {
    Story.author = author;
})

storyEmitter.on('page', (page) => {
    Story.pages = page;

    Story.body = fillArray(page);

    storyEmitter.emit('story', buildUrls(page));
})

storyEmitter.on('body', (body, number) => {

    Story.body[number] = body;

    if(calls >= Story.pages-1){
        saveToFile(Story.title, buildStory(Story.body))
    }

    calls++;
})

storyEmitter.on('story', (urlList) => {
    
    for(var i = 0; i < urlList.length; i++){
        getBody(urlList[i], i);
    }
})

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

function getBody(url, page){
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('.b-story-body-x').filter(function(){
                var data = $(this);

                storyEmitter.emit('body', data.children().first().text(), page);
            })
        }
        else {
            console.log('Error: ' + error);
        }
    })
}

function fillArray(size){
    var newArray = [];

    for(var i = 0; i < size; i++){
        newArray.push('');
    }

    return newArray;
}

function buildUrls(numberOfPages){
    let urls = [];

    for(var i = 0; i < numberOfPages; i++){
        urls.push(baseUrl + '?page=' + (i+1));
    }

    return urls;
}

function buildStory(body) {
    var bodyString = '';

    body.forEach(data => {
        bodyString += data;
    });

    return bodyString;
}

function saveToFile(title, text){
    fs.writeFile("/tmp/" + title + ".txt", text, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
}

if(baseUrl) {
    getHeader(baseUrl);
}