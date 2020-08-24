function q0(input, output, map) {
		
	if (input == null || input == "") {
		output += "";
	}

	else if (isSpecial(input[0], map[4][3])) {
		output = q4(input, output, map);
	} 

	else if (isDigit(input[0], map[4][2])) {
		output += map[1][input[0]];
		output = q0(input.slice(1), output, map);
	}

	else if (isPunctuation(input[0], map[4][1])) {
		output += input[0];
		output = q0(input.slice(1), output, map);
	}

	else if (isVowel(input[0], map[4][0])) {
		// check for basic vowel.
		output += map[3][input[0]];
		output = q3(input, output, map);
	}

	else {
		// check for basic consonant.
		output += map[0][input[0]];
		output = q1(input, output, map);
	}

	return output;
}

function q1(input, output, map) {
	if (input[1] == "" || input[1] == null) {
		output += "";

	}

	else if (isSpecial(input[1], map[4][3])) {
		output = q5(input.slice(1), output, map);
	}

	else if (isDigit(input[1], map[4][2])) {
		output += map[1][input[1]];
		output = q0(input.slice(2), output, map);
	}

	else if (isPunctuation(input[1], map[4][1])) {
		output += input[1];
		output = q0(input.slice(2), output, map);
	}

	else if (isVowel(input[1], map[4][0])) {
		// here vowel is matra.
		output += map[2][input[1]];
		output = q2(input.slice(1), output, map);
	}

	else {
	// Mapping consonant-combination or creating jodakshar; whichever is the best match.
		var tempVal = map[0][input[0] + input[1]] ? [(output.slice(0, -1) + map[0][input[0] + input[1]]), 'y'] : [("्" + map[0][input[1]]), 'n'];
		output = tempVal[1] == 'y' ? tempVal[0] : output + tempVal[0];
		output = q1(input.slice(1), output, map);
	}

	return output;
}

function q2(input, output, map) {
	if (input[1] == "" || input[1] == null) {
		output += "";
	}

	else if (isSpecial(input[1], map[4][3])) {
		output = q4(input.slice(1), output, map);
	}
	
	else if (isDigit(input[1], map[4][2])) {
		output += map[1][input[1]];
		output = q0(input.slice(2), output, map);
	}

	else if (isPunctuation(input[1], map[4][1])) {
		output += input[1];
		output = q0(input.slice(2), output, map);
	}

	else if (isVowel(input[1], map[4][0])) {
		// Mapping vowel-combination or resolving a new basic vowel; whichever is the best match.
		var tempVal = map[2][input[0] + input[1]] ? (input[0] == 'a' ? [map[2][input[0] + input[1]], 'n'] : [(output.slice(0, -1) + map[2][input[0] + input[1]]), 'y']) : [map[3][input[1]], 'n'];
		output = tempVal[1] == 'y' ? tempVal[0] : output + tempVal[0];
		output = tempVal[1] == 'y' ? q0(input.slice(2), output, map) : q3(input.slice(1), output, map);
		}

	else {
		// new consonant.
		output += map[0][input[1]];
		output = q1(input.slice(1), output, map);
	}

	return output;
}

function q3(input, output, map) {
	if (input[1] == "" || input[1] == null) {
		output += "";
	}

	else if (isSpecial(input[1], map[4][3])) {
		output = q4(input.slice(1), output, map);
	}

	else if (isDigit(input[1], map[4][2])) {
		output += map[1][input[1]];
		output = q0(input.slice(2), output, map);
	}

	else if (isPunctuation(input[1], map[4][1])) { 
		output += input[1];
		output = q0(input.slice(2), output, map);
	}

	else if (isVowel(input[1], map[4][0])) {
		// Mapping vowel-combination or resolving a new basic vowel; whichever is the best match.
		var tempVal = map[3][input[0] + input[1]] ? [(output.slice(0, -1) + map[3][input[0] + input[1]]), 'y'] : [map[3][input[1]], 'n'];
		output = tempVal[1] == 'y' ? tempVal[0] : output + tempVal[0];
		output = tempVal[1] == 'y' ? q0(input.slice(2), output, map) : q3(input.slice(1), output, map);

	}

	else {
		// new basic consonant
		output += map[0][input[1]];
		output = q1(input.slice(1), output, map);
	}

	return output;
}

function q4(input, output, map) {
	if (input[1] == null || input[1] == "") {
		output += input[0];
	}

	else if (isSpecial(input[1], map[4][3])) {
		output += input[0] 
		output = q4(input.slice(1), output, map);
	} 

	else if (isDigit(input[1], map[4][2])) {
		output += input[0] + map[1][input[1]];
		output = q0(input.slice(2), output, map);
	}

	else if (isPunctuation(input[1], map[4][1])) {
		output += input[0] + input[1];
		output = q0(input.slice(2), output, map);
	}

	else if (isVowel(input[1], map[4][0])) {
		// basic vowel.
		var tempVal = map[3][input[0] + input[1]] ? map[3][input[0] + input[1]] : input[0] + map[3][input[1]];
		output += tempVal;
		output = q0(input.slice(2), output, map);
	}

	else {
		// basic consonant.
		var tempVal = map[0][input[0] + input[1]] ? [map[0][input[0] + input[1]], 'c'] : [map[2][input[0] + input[1]], 'm'];
		output += (tempVal[0] === undefined) ? (input[0] + map[0][input[1]]) : (tempVal[1] === 'c' ? map[0][input[0] + input[1]] : map[2][input[0] + input[1]]);

		output = tempVal[1] == 'm' ? q0(input.slice(2), output, map) : q1(input.slice(1), output, map);
	}

	return output;
}

function q5(input, output, map) {
	if (input[1] == null || input[1] == "") {
		output += input[0];
	}

	else if (isSpecial(input[1], map[4][3])) {
		output += input[0] 
		output = q5(input.slice(1), output, map);
	} 

	else if (isDigit(input[1], map[4][2])) {
		output += input[0] + map[1][input[1]];
		output = q0(input.slice(2), output, map);
	}

	else if (isPunctuation(input[1], map[4][1])) {
		output += input[0] + input[1];
		output = q0(input.slice(2), output, map);
	}

	else if (isVowel(input[1], map[4][0])) {
		// matra
		var tempVal = map[2][input[0] + input[1]] ? map[2][input[0] + input[1]] : input[0] + map[3][input[1]];
		output += tempVal;
		output = q0(input.slice(2), output, map);
	}

	else {
		// basic consonant.
		var tempVal = map[0][input[0] + input[1]] ? [map[0][input[0] + input[1]], 'c'] : [map[2][input[0] + input[1]], 'm'];
		output += (tempVal[0] === undefined) ? (input[0] + map[0][input[1]]) : (tempVal[1] === 'c' ? "्" + map[0][input[0] + input[1]] : map[2][input[0] + input[1]]);

		output = tempVal[1] == 'm' ? q0(input.slice(2), output, map) : q1(input.slice(1), output, map); 
				
	}

	return output;
}
