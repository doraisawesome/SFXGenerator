const path = require('path');
const fs = require('fs');
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
	Max.outlet(filenames.length);
});

function setFileDir(fileDir) {
    sampleDir = fileDir.slice(0,-1);
	Max.post(`sample file directory is ${sampleDir}`);
}

function getFolderDir() {
    return sampleDir;
}

function extractFileNames() {
	fs.readdir(sampleDir, (err, files) => {	
        if (err) throw err;
        for (let index in files) {
            filenames.push(files[index]);
        }
	});
}

function getFileNames() {
    return filenames;
}

exports.getFileNames = getFileNames;
exports.getFolderDir = getFolderDir;