'use strict';

const path = require('path');

if (!global.__line) {
	Object.defineProperty(global, '__line', {
		get: function () {
			const e = new Error();
			const frame = e.stack.split('\n')[2].trim(); 
			const lineNumber = frame.split(':').reverse()[1];
			return lineNumber || '';
		},
	});
}

function getCallerFile() {
	const e = new Error();
	const frame = e.stack.split('\n')[3].trim();
	const filePath = frame.split(':').reverse()[2].split(path.sep).reverse()[0];
	return filePath;
}

if (!global.__cfn) {
	Object.defineProperty(global, '__cfn', {
		get: function () {
			const filename = getCallerFile();
			return filename ? filename.split('.').slice(0, -1).join('.') : '';
		},
	});
}

if (!global.__cf) {
	Object.defineProperty(global, '__cf', {
		get: function () {
			return getCallerFile();
		},
	});
}

module.exports = {
	getCallerFile,
};