/* the main ajax method */
function loadMapAndRevmap(){
var xhttp = new XMLHttpRequest();
	var map = [];
	var entry;
	var revmap = [];
	var file = "all_files_combined.csv";
	var filesList;

	xhttp.onreadystatechange = function() {
    		if (xhttp.readyState == 4 && xhttp.status == 200) {
			filesList = xhttp.responseText.split(/----------\n/);
		}
	};
	xhttp.open("GET", "https://shubham1010.github.io/jsonfiles/all_files_combined.csv", false);
	xhttp.send();
	for (var i = 0; i < 4; i++) {
		entry = parseCSV(filesList[i]);
		map.push(entry[0]);
		revmap.push(entry[1]);
	}
	entry = filesList[4].split("\n");
	map.push(entry);
	revmap.push(entry);

	map = JSON.stringify(map);
	revmap=JSON.stringify(revmap);
	localStorage.setItem("map",map);
	localStorage.setItem("revmap",revmap);
}
loadMapAndRevmap();
function loadDoc(func) {
	var map = localStorage.getItem("map");
	map=JSON.parse(map);
	var revmap = localStorage.getItem("revmap");
	revmap=JSON.parse(revmap);
	func(map, revmap);
}

/* Latin to Devanagari */

function getOutputText(inputText,inputWord,outputWord,count){
	var outputText = document.getElementById("result").value;
	var splitInputText = inputText.split(" ");
	var splitCount = 0;
	var i=0,j=0;
	if(inputWord==" "){
		inputWord="";
		outputWord="";
	}
	for(i = 0; i < splitInputText.length;i++){
		//alert(count);
		if(splitInputText[i]==inputWord){
			if(count==splitCount){
				break;
			}
			splitCount++;
		}
	}
	var splitOutputText;
	splitOutputText = outputText.split(" ");
	var lenOutputArray=splitOutputText.length;	
	splitOutputText[i] = outputWord;
	i=0;
	splitOutputText = removeExtraSpaces(lenOutputArray, splitOutputText, splitInputText);
	
	outputText = splitOutputText.join(" ");
	
	return outputText;
} 
function removeExtraSpaces(lenOutputArray, splitOutputText, splitInputText)
{
	var i=0;
	while(true)
	{
		
		if(i==lenOutputArray)
			break;
		if(splitOutputText[i]=="" && splitInputText[i]!="")
		{
			splitOutputText.splice(i,1);
			lenOutputArray--;
		}
		else
		{
			i++;
		}
	}
	return splitOutputText;
}
function transliterate(map, revmap) {
	highlightFlag=0;
	destroyHighlight();
	cursorFlag=1;
	var text = document.getElementById("latinText").value;
	if(wholeTextFlag==1)
	{
		var outputText = q0(text, "", map);		
		document.getElementById("result").value = outputText;
		wholeTextFlag=0;
		return;
	}
	var count=0;
	var changedWord;
	var index= document.getElementById("latinText").selectionStart;
	var outputText = document.getElementById("result").value;
	cursorFlag=1;
	index = index-1;
	if(backspaceFlag==1)
	{
		var splitOutputText;
		splitOutputText = outputText.split(" ");
		var lenOutputArray=splitOutputText.length;	
		var splitInputText = text.split(" ");
		splitOutputText = removeExtraSpaces(lenOutputArray, splitOutputText, splitInputText);
		outputText = splitOutputText.join(" ");
		document.getElementById("result").value = outputText;
	}
	/*if(text[index]==" " && backspaceFlag!=1)
	{
		var splitOutputText = outputText.split(" ");
		var splitInputText = text.split(" ");
		for(var i=0;i<splitInputText.length;i++){
			if(splitInputText[i]=="" && splitOutputText[i]!="")			
				splitOutputText.splice( i, 0, "");
		}
		outputText = splitOutputText.join(" ");
		document.getElementById("result").value = outputText;
	}
	else*/ if((text[index]==" "||index==-1) && backspaceFlag==1)
	{
		var splitOutputText = outputText.split(" ");
		var splitInputText = text.split(" ");
		for(var i=0;i<splitInputText.length;i++){
			if(splitInputText[i]=="" && splitOutputText[i]!="")			
				splitOutputText[i]="";
		}
		outputText = splitOutputText.join(" ");
		document.getElementById("result").value = outputText;
	}
	else
	{
		changedWord = getWord(text,index,index);
		backspaceFlag=0;
		var indices = getIndicesOfWholeString(changedWord[0],text,true);
		for(var i=0;i<indices.length;i++){
			if(changedWord[1]==indices[i]){
				count=i;
				break;
			}
		}
		var inputWord = changedWord[0];
		var outputWord = q0(inputWord, "", map);
		var outputText = getOutputText(text,inputWord,outputWord,count);
		document.getElementById("result").value = outputText;
	}
}

/* Devanagari to Latin */
function revTransliterate(map, revmap) {
	highlightFlag=0;
	destroyHighlight();
	cursorFlag=1;
	var text = document.getElementById("devanagariText").value;
	if(wholeTextFlag==1)
	{
		var outputText = revParseText(text, revmap);		
		document.getElementById("result").value = outputText;
		wholeTextFlag=0;
		return;
	}
/*	var count=0;
	var index = document.getElementById("devanagariText").selectionStart - 1;
	var changedWord = getWord(text,index,index);
	var indices = getIndicesOfWholeString(changedWord[0],text,true);
	for(var i=0;i<indices.length;i++){
		if(changedWord[1]==indices[i]){
			count=i;
			break;
		}
	}
	var inputWord = changedWord[0];

	var outputWord = revParseText(inputWord, revmap);
	var outputText = getOutputText(text,inputWord,outputWord,count);
	
	document.getElementById("result").value = outputText;*/
	var count=0;
	var changedWord;
	var index= document.getElementById("latinText").selectionStart;
	var outputText = document.getElementById("result").value;
	
	index = index-1;
	if(backspaceFlag==1)
	{
		var splitOutputText;
		splitOutputText = outputText.split(" ");
		var lenOutputArray=splitOutputText.length;	
		var splitInputText = text.split(" ");
		splitOutputText = removeExtraSpaces(lenOutputArray, splitOutputText, splitInputText);
		outputText = splitOutputText.join(" ");
		document.getElementById("result").value = outputText;
	}
/*	if(text[index]==" " && backspaceFlag!=1)
	{
		var splitOutputText = outputText.split(" ");
		var splitInputText = text.split(" ");
		for(var i=0;i<splitInputText.length;i++){
			if(splitInputText[i]=="" && splitOutputText[i]!="")			
				splitOutputText.splice( i, 0, "");
		}
		outputText = splitOutputText.join(" ");
		document.getElementById("result").value = outputText;
	}
	else */if((text[index]==" "||index==-1) && backspaceFlag==1)
	{
		var splitOutputText = outputText.split(" ");
		var splitInputText = text.split(" ");
		for(var i=0;i<splitInputText.length;i++){
			if(splitInputText[i]=="" && splitOutputText[i]!="")			
				splitOutputText[i]="";
		}
		outputText = splitOutputText.join(" ");
		document.getElementById("result").value = outputText;
	}
	else
	{
		changedWord = getWord(text,index,index);
		backspaceFlag=0;
		var indices = getIndicesOfWholeString(changedWord[0],text,true);
		for(var i=0;i<indices.length;i++){
			if(changedWord[1]==indices[i]){
				count=i;
				break;
			}
		}
		var inputWord = changedWord[0];
		var outputWord = revParseText(inputWord, revmap);
		var outputText = getOutputText(text,inputWord,outputWord,count);
		document.getElementById("result").value = outputText;
	}

}

/* The function to parse Devanagari input and to obtain the corresponding characters */
function revParseText(inputText, revmap) {
	var cursor = 0;
	var outputText = "";

	inputText = removeExtraWhitespace(inputText);

	
	while (cursor < inputText.length) {
		for (var i = 0; i < 4; i++) {
			if (revmap[i][inputText[cursor]] !== undefined) {

				if (isHalant(inputText[cursor])) {
					outputText = outputText.slice(0, -1);
				}

				else if (i == 2 && !isAnuswar(inputText[cursor])) {
					outputText = outputText.slice(0, -1);
				}
				
				outputText += revmap[i][inputText[cursor]];
				
				if (i == 0) {
					outputText += "a";
				}
				
			}
		}

		if (inputText[cursor] == " " || inputText[cursor] == "." || isPunctuation(inputText[cursor], revmap[4][1]))
			outputText += inputText[cursor];

		else
			outputText += "";
		cursor ++;
		
	}
	
	return removeExtraWhitespace(outputText);
}
