/*
this is a full 78 interpreter written in js without any extra features

[v] All 78 features
[x] Networking features
[x] Function support
  [x] Library support
*/

const process = require('process');
const fs = require('fs');

let file = process.argv[2];

let input;

if (!file) {
	console.log('No file provided');
	process.exit(1);
} else {
	input = fs.readFileSync(file, 'utf8');
}

// memory stuff
let mainval = 0;
let bakval = 0;

let gmult = 0;

function runCodePiece(code, loop) {
	const arrlen = code.length;
	code.split('').forEach((v, i) => {
		if (code[i - 1]) {
			const vp = code[i - 1];
			if (vp === 'h') {
				let cond = mainval > 0;
				if (code[i - 2] === 'k') cond = mainval < 0;
				if (cond) return;
			}
			if (vp === 'j') {
				let cond = mainval === 0;
				if (code[i - 2] === 'k') cond = mainval !== 0;
				if (cond) return;
			}

			if (v !== 'g' && vp === 'g') {
				mainval += Math.round(Math.pow(10, -gmult) * 100) / 100;
				gmult = 0;
			}
		}

		if (code.split('').slice(i, i + 4).join('') === 'fuck') process.exit(0);

		switch(v) {
			case 'a':
				mainval += 7;
				break;
			case 'b':
				mainval -= 8;
				break;
			case 'g':
				gmult++;
				break;
			case 'o':
				process.stdout.write(String(mainval * 2))
				break;
			case 's':
				let bak = bakval;
				bakval = mainval;
				mainval = bak;
				break;
			case 'r':
				mainval = 8;
				break;
			case 'y':
				process.stdout.write(String.fromCharCode(mainval));
				break;
			case 'k':
				if (code[i + 1] && (code[i + 1] === 'h' || code[i + 1] === 'j'))
				break;
			case ' ':
			case '\n':
			case 'j':
			case 'u':
			case 'c':
			case 'h':
				break;
			default:
				console.log(`${v}: Unrecognized instruction`);
				break;
		}

		if (i === arrlen - 1 && loop && mainval !== 0) runCodePiece(code, loop);
	});
}

while(true) {
	for (b in input.split('!')) {
		runCodePiece(input.split('!')[b], b % 2 == 1);
	}
}
