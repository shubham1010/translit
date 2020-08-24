function isHalant(input) {
	if (input == "्") {
		return true;
	}
	return false;
}

function isAnuswar(input) {
	if (input == "ं") {
		return true;
	}
	return false;
}

function isSpecial(ch, specials) {
	res = find(ch, specials);
	return res;
}

function isVowel(ch, vowels) {
	res = find(ch, vowels);
	return res;
}

function isPunctuation(input, punctMarks) {
	return find(input, punctMarks);
}

function isDigit(input, digits) {
	return find(input, digits);
}

function find(ch, listL) {

	for (var i = 0; i < listL.length; i++) {
		if (ch == listL[i]) {
			return true;
		}
	}
	return false;
}

function removeExtraWhitespace(text) {
	return text.replace(/\s+/g,' ');
}

function parseCSV(input) {
	var arr = input.split('\n');
	var dTol = {};
	var lTod = {};

	for (var i = 0; i < (arr.length - 1); i ++) {
		var temp = arr[i].split('",');
		var temp2 = temp[2];
		temp[2] = temp2.split(',');	
		temp = removequote(temp);
		var key = temp[0];
		dTol[key] = temp[2][0];
		for (var j = 0; j < temp[2].length; j ++) {
			var key = temp[2][j];
			lTod[key] = temp[0];
		}
	}

	return [lTod, dTol];
}

function removequote(input) {
	for (var i = 0; i < input.length; i ++) {
		if (typeof(input[i]) === "string" || input[i] instanceof String)  {
			input[i] = input[i].replace(/ /g, '');
			input[i] = input[i].replace(/"/g, '');
		}
		else {
			for(var j = 0; j < input[i].length; j ++) {
				input[i][j] = input[i][j].replace(/ /g, '');
				input[i][j] = input[i][j].replace(/"/g, '');
			}
		}
	}
	return input;
}

function isAlphabet(input)
{
	list = ['a', 'b', 'c', 'd', 'e', 
		'f', 'g', 'h', 'i', 'j', 
		'k', 'l', 'm', 'n', 'o', 
		'p', 'q', 'r', 's', 't',
		'u','v', 'w', 'x', 'y', 'z'];
	for(var a in list){
		if(input.toLowerCase()===list[a])
			return true;
	}
	return false;
}
