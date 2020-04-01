// var folder = new Folder();
// var file = new File();
const path = require('path');
const Max = require('max-api');

// This will be printed directly to the Max console
Max.post(`Loaded the ${path.basename(__filename)} script`);

// Use the 'addHandler' function to register a function for a particular message
Max.addHandler("bang", () => {
	Max.post(`Who you think you bangin ${process.cwd()}`);
	getWaveFile();
});

function getWaveFile() {
	Max.post("test");
}