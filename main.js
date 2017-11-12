var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var app = express();

let url = process.argv[2];

console.log(url);

function aquire(){
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var json = { title: '' };

                $('.b-story-header').filter(function(){
                    var data = $(this);
    
                    json.title = data.children().first().text();
                })
    
                $('.b-story-body-x').filter(function(){
                    console.log('body');
                    var data = $(this);
    
                    saveToFile(data.children().first().text())
                })

            console.log(json);
        }
        else{
            console.log('Error: ' + error);
        }
    })
}

function saveToFile(text){
    fs.writeFile("/tmp/test.txt", text, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
}

if(url){
    aquire();
}