// var folder = new Folder();
// var file = new File();
const path = require('path');
const fs = require('fs');
const Max = require('max-api');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

let currentDir = process.cwd();
let samples = `${currentDir}/samples`;
let filenames = [];
fs.readdir(samples, (err, files) => {
	if (err) throw err;

	for (let index in files) {
		filenames.push(files[index]);
	}
})

// Use the 'addHandler' function to register a function for a particular message
Max.addHandler('readWave', (fileIndex) => {
	Max.post(`Reading file at position ${fileIndex}`);
	getWaveFile(fileIndex);
});

function getWaveFile(pos) {	
	Max.post(filenames[pos]);
	Max.outlet(filenames[pos]);
}