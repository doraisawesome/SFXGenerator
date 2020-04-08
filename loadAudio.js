const path = require('path');
const os = require('os');
const fs = require('fs').promises;
const Max = require('max-api');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);
let sampleDir = '';
let filenames = [];
let filecount = 0;

// Use the 'addHandler' function to register a function for a particular message
Max.addHandler('readWave', (fileIndex) => {
	Max.post(`Reading file at position ${fileIndex}`);
	getWaveFile(fileIndex);
});

// Max.addHandler('getFileNames', (filenames) => {
// 	Max.post(`sucess! ${filenames}`);
// 	Max.outletBang();
// })
// Max.addHandler('getFolderPath', (dir) => {
// 	sampleDir = dir;
// })

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
    // Max.outlet('getFolderPath', sampleDir);
}

// function getFolderDir() {
// 	Max.post(`Got sample folder! ${sampleDir}`);
//     return sampleDir;
// }

async function extractFileNames() {
	filenames = [];
	
	const files = await fs.readdir(sampleDir);

    for (let index in files) {
		let currentFile = files[index];
		if (path.extname(currentFile) === '.wav') {
			filenames.push(files[index]);
		}
	}

}

function getWaveFile(pos) {
	Max.post(`file: ${sampleDir}/${filenames[pos]}`);
	Max.outlet('getWaveFiles', `${sampleDir}/${filenames[pos]}`);
}