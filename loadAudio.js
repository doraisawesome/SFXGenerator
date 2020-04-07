// var folder = new Folder();
// var file = new File();
const path = require('path');
const fs = require('fs');
const Max = require('max-api');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

// let currentDir = process.cwd();
let sampleDir = '';
let filenames = [];

// Use the 'addHandler' function to register a function for a particular message
Max.addHandler('readWave', (fileIndex) => {
	Max.post(`Reading file at position ${fileIndex}`);
	getWaveFile(fileIndex);
});

Max.addHandler('setFileDir', (inputDir) => {
	setFileDir(inputDir);
	extractFileNames();
});

function setFileDir(fileDir) {
	Max.post(`sample file directory is ${fileDir}`);
	sampleDir = fileDir;
}

function extractFileNames() {
	fs.readdir(sampleDir, (err, files) => {
		if (err) {
			Max.post(err);
		} else {
			for (let index in files) {
				filenames.push(files[index]);
			}
		}
	});
}

function getWaveFile(pos) {
	Max.post(filenames[pos]);
	Max.outlet(`${sampleDir}/${filenames[pos]}`);
}