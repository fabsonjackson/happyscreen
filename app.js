#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const fs  = require("node:fs");
const { parse } = require('node-html-parser');
const prerender = require('prerender');
let captureWebsite = null;

import('capture-website').then((importedModule) => {
    captureWebsite = importedModule;
    program
        .name('happyscreen')
        .description('check websites after update for changes')
        .version('0.8.0');

    program.command('capture')
        .description('capture screenshot of website before update')
        .argument('<url>', 'url to screenshot')
        .option('--out', 'save path in png')
        .action((url, options) => {
            const path = options.out || "screenshot.png";

            captureWebsite.default.file(url, path) .then(console.log);
        });

    program.command('strip-capture')
        .description('strip certain selector and render')
        .argument('<url>', 'path to html')
        .argument('<selector>', 'css selector to strip')
        .option('--out', 'save path in png')
        .action((url, selector, options) => {
            const path = options.out || "screenshot.png";
            const html = fs.readFileSync(url,"utf-8");
            const root = parse(html);
            console.log(selector)
            captureWebsite.default.file(root.removeChild(selector).toString(), path, {
	inputType: 'html'
} ).then(console.log);
        });


    program.command('start-prerender')
        .description('start prerender server')
        .option('--chrome', 'path to chrome browser')
        .action((options) => {
const server = prerender({

 chromeLocation: options.chrome || '/usr/bin/chromium-browser'
});
server.start();    
        });



    program.parse();
});
