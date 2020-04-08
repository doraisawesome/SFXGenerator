const path = require('path');
const os = require('os');
const fs = require('fs').promises;
const Max = require('max-api');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

let sampleDir = '';
let filenames = [];

Max.addHandler('setFileDir', (inputDir) => {
	setFileDir(inputDir);
    extractFileNames();
});

Max.addHandler('getFileCount', () => {
	Max.outlet('getFileCount', filenames.length);
});

function setFileDir(fileDir) {
    // only tested on Macintosh system
    let homeDir = os.homedir();
    sampleDir = fileDir.substring(fileDir.indexOf(homeDir)).slice(0,-1);
    Max.post(`sample file directory is ${sampleDir}`);
    Max.outlet('getFolderPath', sampleDir);
}

function getFolderDir() {
    Max.post(`Got sample folder! ${sampleDir}`);
    return sampleDir;
}

async function extractFileNames() {
    filenames = [];
	const files = await fs.readdir(sampleDir);
    for (let index in files) {
        Max.post(files[index]);
        filenames.push(files[index]);
    }
    Max.outlet('getFileNames', filenames);
}

function getFileNames() {
    Max.post(`Got file name list! ${filenames.length}`);
    return filenames;
}

exports.getFileNames = getFileNames;
exports.getFolderDir = getFolderDir;