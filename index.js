const { performance } = require('perf_hooks');
var fs = require('fs')

function idiomatic(tagCount) {
	performance.mark('A');
	let tags = new Set(Array.from({length: tagCount}, () => Math.floor(Math.random() * 10)));
	tags = Array.from(tags).map(x => `tag${x}`).join('|');
	performance.mark('B');

	performance.measure('A to B', 'A', 'B');
	const measure = performance.getEntriesByName('A to B')[0];
	performance.clearMeasures('A to B');

	return measure.duration;
}

function traditional(tagCount) {
	let tagset = new Set();
	let tagstr = "";

	performance.mark('C');

	for (let tag=0; tag<tagCount; tag++) {
		tagset.add(Math.floor(Math.random() * 10));
	}

	tagset.forEach((tag) => {
		tagstr += 'tag' + tag + '|'
	});

	tagstr = tagstr.slice(0, -1);
	performance.mark('D');
	performance.measure('C to D', 'C', 'D');
	const measure = performance.getEntriesByName('C to D')[0];
	performance.clearMeasures();
	return measure.duration;
}

let timesIdiomatic = [];
let timesTraditional = [];
let numberOfTags = 5;
let numberOfIterations = 100;

for (let i=0; i<numberOfIterations; i++) {
	timesIdiomatic.push(idiomatic(numberOfTags));
	timesTraditional.push(traditional(numberOfTags));
}

let fd = fs.openSync('results.csv', 'a');
let str = "";

str = 'idiomatic,traditional\n';
fs.writeSync(fd, str, 0, str.length, null);

for (let i=0; i<numberOfIterations; i++) {
	let str = `${timesIdiomatic[i]},${timesTraditional[i]}\n`;

	fs.writeSync(fd, str, 0, str.length, null);
};

fs.closeSync(fd);
