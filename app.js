#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();

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

    program.parse();
});
