window.addEventListener("click",setHighlightFlag);


//setTimeout(function(){},500);
var flag=0,highlightFlag=0,findFlag=0, cursorFlag=0,changeKeyFlag=0,wholeTextFlag=0,backspaceFlag=0, spaceFlag=0;
var keys=[]
var key_ascii_list = [[17,49],[17,50],[17,51],[17,52],[17,53],[17,54],[17,55]]
var key_id;
var key_list=[]
var key_names=[]
var key_name_list=[["control","1"],["control","2"],["control","3"],["control","4"],["control","5"],["control","6"],["control","7"]]
function getIndicesOfWholeString(searchingFor, str) {
	var index1=0,index2=0;
	var indicesList=[];

	var regex = new RegExp('\\b' + searchingFor + '\\b');
	while(true)
	{
		var n=str.search(regex);

		if(n==-1){
			return indicesList;
		}
		indicesList.push(n+index2);
		index1=n+searchingFor.length;
		index2=index2+n+searchingFor.length;
		str = str.slice(index1);
	}
}

function check(id){
	//alert(key_ascii_list[id]);
	changeKeyFlag=1;
	key_id=id
	document.getElementById("change_key").style.display = "block";
	document.getElementById("change_key").innerHTML="Please press desired keys... ";
}
function concatArrayElm(arr){
	var i,str="";
	for(i=0;i<arr.length;i++){
		str+=arr[i]
		if(i!=arr.length-1)
			str+="+";
	}
	return str;
}
function init(){

	document.getElementById("0").innerHTML=concatArrayElm(key_name_list[0]);
	document.getElementById("1").innerHTML=concatArrayElm(key_name_list[1]);
	document.getElementById("2").innerHTML=concatArrayElm(key_name_list[2]);
	document.getElementById("3").innerHTML=concatArrayElm(key_name_list[3]);
	document.getElementById("4").innerHTML=concatArrayElm(key_name_list[4]);
	document.getElementById("5").innerHTML=concatArrayElm(key_name_list[5]);
	document.getElementById("6").innerHTML=concatArrayElm(key_name_list[6]);

}
init();
function checkKeyStrokesActive(index)
{
	var keyList=key_ascii_list[index];
/*	if(keyList.length==1)
	{
		if(keys[keyList[0]])
			return true
	}
	else if(keyList.length==2)
	{
		if(keys[keyList[0]] && keys[keyList[1]])
                        return true
	}
	else if(keyList.length==3)
	{
		if(keys[keyList[0]] && keys[keyList[1]] && keys[keyList[2]])
                        return true
	}
*/	
	var status = keys[keyList[0]];
	for(var i=1;i<keyList.length;i++)
	{
		status = status && keys[keyList[i]]
	}
	return status;
}
function validateKeyLists(new_list){
	len = new_list.length
	for(var i=0;i<key_ascii_list.length;i++)
	{
		if(len==key_ascii_list[i].length)
		{
			old_key_list=key_ascii_list[i];
			new_list.sort();
			key_ascii_list[i].sort();
			count=0;
			for(var j=0;j<len;j++)
			{
				if(new_list[j]==old_key_list[j])
					count++;
			}
			if(count==len)
				return false
		}	
	}
	return true;
}
//keystrokes
function keysPressed(e) {
  // store an entry for every key pressed
  //alert(e.key);
  if(changeKeyFlag===1){
	if(e.keyCode==16 ||e.keyCode==17||e.keyCode==18)
	{
		key_list.push(e.keyCode);
		key_names.push(e.key);
		return;
	}
	
	key_list.push(e.keyCode);
	key_names.push(e.key);
	var key_set = new Set(key_list);
	var key_names_set = new Set(key_names);
	key_list = [...key_set];
	key_names = [...key_names_set];

	if(validateKeyLists(key_list))
	{
		key_ascii_list[key_id]=key_list;
		key_name_list[key_id]=key_names;
		document.getElementById(key_id).innerHTML=concatArrayElm(key_name_list[key_id]);
	}
	else{
		alert("already exists");
	}
	key_list=[];
	key_names=[];
	changeKeyFlag=0;
	document.getElementById("change_key").style.display="none";

        return;
  }
  keys[e.keyCode] = true;
  //destroyHighlight();
  if (checkKeyStrokesActive(0)) { //change input box(latin or devanagari)
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';    
	setFlag();
  }
  else if (checkKeyStrokesActive(1)) { //copy result text
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';
	copyText();
	cursorFlag=0;
  }
/*  else if (keys[17] && keys[51]) { //highlight input selected word in result
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';
	highlightSelectedText();

  }*/  
else if (checkKeyStrokesActive(3)) { //highlight input selected word in result
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';
	setHelp();
  } 
else if (checkKeyStrokesActive(4)) { //highlight input selected word in result
	cursorFlag=0;
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';
	setFindAndReplaceFlag();
  }  
else if (checkKeyStrokesActive(5)) { //highlight input selected word in result
	cursorFlag=0;
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';
	findAndReplace();
  } 
else if (checkKeyStrokesActive(6)) { //focus on input textarea
	//cursorFlag=1;
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';
    	setFocus();
    //destroyHighlight();
  } 
  else if (checkKeyStrokesActive(2)) { //find a word in input
	cursorFlag=0;
	document.getElementById('findTextbox').value='';
	document.getElementById('findTextbox').style.display='none';
    	findWordFlag();
	e.preventDefault(); 
  }
 /* else if(keys[37] && !keys[16])
  {
	//cursorFlag=1;
	destroyHighlight();
	highlightSelectedText(37);
	keys[37]=false;	
  }
  else if(keys[39] && !keys[16])
  {
	//cursorFlag=1;
	destroyHighlight();
	highlightSelectedText(39);
	keys[39]=false;
  }*/
  else if(keys[17] && keys[86]){
  	wholeTextFlag=1;

  }
  else if(keys[8]){

	keys[8]=false;
	wholeTextFlag=1;
  }
  else if(keys[32]){
	wholeTextFlag=1;
	keys[32]=false;
  }
  else if(keys[46])
  {
	wholeTextFlag=1;
	keys[46]=false;
  }
}

function setFocus(){
	if(flag==0)
		document.getElementById('latinText').focus();
	else
		document.getElementById('devanagariText').focus();
}

function keysReleased(e) {
  // mark keys that were released
  keys[e.keyCode] = false;

}
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);




function setHighlightFlag(){
	focused_id = document.activeElement.id;
	a = document.activeElement.selectionStart - document.activeElement.selectionEnd;
	if((focused_id=="devanagariText" || focused_id=="latinText") && a==0)
	{
		
		//cursorFlag=1;
		highlightSelectedText();
	}

	destroyHighlight();
}

//copy result textbox
function copyText(){
	document.getElementById('findTextbox').style.display='none';
	document.getElementById('findAndReplaceDiv').style.display='none';
	var id="result";
	var copiedText = document.getElementById(id);
	copiedText.select();
	document.execCommand("Copy");
}
//conversion of input
function conversionOnSelection(text) {
	var map=localStorage.getItem("map");
	var revmap=localStorage.getItem("revmap");
	map = JSON.parse(map);
	revmap = JSON.parse(revmap);
	if(flag==0)
		return latinToDeva(text, map, revmap);
	else
	{
		a =  devaToLatin(text, map, revmap);
		return a;
	}
}
//latin to devanagari conversion
function latinToDeva(text, map, revmap) {
	var output=q0(text, "", map);
	return output;
}
//devanagari to latin conversion
function devaToLatin(text, map, revmap) {
	var output=revParseText(text, revmap);
	return output;
}

//finds indices of substrings
function getIndicesOf(searchStr, str, caseSensitive) { 
  var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + 1;
    }
    return indices;
}

//get selected text
function getSelectedText(textArea){
	var text=textArea.value;
	var startIndex=textArea.selectionStart;
	var endIndex=textArea.selectionEnd;
	var selectedText=text.substring(startIndex, endIndex);
	return [selectedText,startIndex,endIndex-1];
}

//function to get word within which selected word lies
function getWord(text,start,end){
	var word="";
	var i=start,j=end;

	while(1)
	{
		if( (text[i] == " " && text[j]!=" ") ||  (i<=0 && text[j] != " ") ||  (i<=0 || text[i]==" ") &&  j<text.length){
			j++;
			if(text[j]==" " || j>text.length)
			{
				j--;
				word = text.slice(i,j+1);
				return [word,i,j];
			}
			else if(j==text.length)
			{
				word = text.slice(i,j+1);
				return [word,i,j];
			}
		}
		else if((text[i] != " " && text[j]==" ") || (text[i] != " " && j>=text.length) || ((j>=text.length || text[j]==" ") && i>=0)){
			i--;
			if(text[i]==" ")
			{
				i++;
				word = text.slice(i,j+1);
				return [word,i,j];
			}
			else if(i==0)
			{
				word = text.slice(i,j+1);
				return [word,i,j];
			}
		}
		else
			break;
	}
	while(1){
		if((text[i] == " " && j>=text.length) ||(i<=0 && text[j] == " ") || (j>=text.length && i<=0) || (text[i] == " " && text[j] == " " )){
			break;
		}
		if(text[i]!=" " && i>0){
			i--;
		}
		if(text[j]!=" " && j<text.length ){
			j++;
		}
	}
        if(!(j>=text.length))
	{
		j--;
	}
	if(!(i<=0))
	{
		i++;
	}
	var word=text.slice(i,j+1);
	return [word,i,j];	
}

function selection(){
	cursorFlag=0;
	highlightFlag = 1;
	highlightSelectedText();
}

//on click function call 
function highlightSelectedText(key=0){}
/*function highlightSelectedText(key=0){
	document.getElementById('change_key').style.display='none';	
	document.getElementById('not_found').style.display='none';	
	document.getElementById('findTextbox').style.display='none';
	document.getElementById('findAndReplaceDiv').style.display='none';
	var t;
	var textArea;

	if(flag==0)
	{
		textArea = document.getElementById("latinText");
	}	
	else
	{
		textArea = document.getElementById("devanagariText");
	}
	var textArea2= document.getElementById("result").value;
	var textArea8= document.getElementById("result");
	var selectedLatinText;
	if(textArea.selectionStart==textArea.selectionEnd)
		return;
	if(cursorFlag!=1){	
		selectedLatinText = getSelectedText(textArea); //list contains selectedLatinText,start,end
	}
	else{
		var end=textArea.selectionEnd;
		len = textArea.value.length;
		if(len==end)
			end=len;		
		else if(key==37)
			end = end-1;
		else if(key==39)
			end = end+1;
		//alert(end);
		var start = 0;
		if(end>0)
			start = end - 1;
		else
			return;
		text=textArea.value;
		var selectedText=text.substring(start, end);
		selectedLatinText= [selectedText,start,end];
	}

	var wholeLatinWord = getWord(textArea.value,selectedLatinText[1],selectedLatinText[2]);//get whole word
	selectedStart= selectedLatinText[1];
	selectedEnd = selectedLatinText[2];
	
	var i=wholeLatinWord[1];
	var j=wholeLatinWord[2];
	var substrng = conversionOnSelection(selectedLatinText[0]);
	var strng = conversionOnSelection(wholeLatinWord[0]); ///devanagari

	var strngIndices = getIndicesOf(strng,textArea2) //result indices
	var wholeLatinWordIndices = getIndicesOf(wholeLatinWord[0],textArea.value) //latin indices
	var eng_word_index=0;	
	for(eng_word_index=0;eng_word_index<wholeLatinWordIndices.length;eng_word_index++)
	{
		if(wholeLatinWordIndices[eng_word_index]==i)
			break;
	}


	var arr0=getIndicesOf(selectedLatinText[0],wholeLatinWord[0]);
	var arr1=getIndicesOf(substrng,strng); //marathi indices substring
	var k;
//	alert(arr0);
	//alert("marathi word start "+strngIndices[eng_word_index]);
	var count=0;
	if(arr1.length==arr0.length){
		for(k=0;k<arr0.length;k++){
		//	alert(arr0[k]+' '+i+" "+selectedLatinText[1]);
			if((arr0[k]+i)==selectedLatinText[1]){
				break;
			}
		}
	}
	else if(arr1.length!=arr0.length){
		for(k=0;k<arr1.length;k++)
		{
		//	alert(k);
			var dummy = (strngIndices[eng_word_index]+arr1[k]);
		//	alert(dummy+'  '+selectedLatinText[1]);
			count=1;
			if(dummy>=selectedLatinText[1])
			{
				if(selectedLatinText[1]==0)
				{
					k=1;
				}
				
				break;
			}
		}
		if(count==1)
			k--;
		else
			k=-1;
		dummy=(strngIndices[eng_word_index]+arr1[k]);
		//alert(dummy+"  "+selectedLatinText[1]);
		if(   (selectedLatinText[1]-(strngIndices[eng_word_index]+arr1[k]) )>2)
			k=-1;
		if(selectedLatinText[1]>0 && dummy==0)
			k=-1;
	}
	//alert("k= "+k+" "+strngIndices[eng_word_index]);
	dev_start = strngIndices[eng_word_index]+arr1[k];
	dev_end = dev_start + substrng.length;
	
	//alert(strng[dev_start]+" "+strng[dev_end]);
	if(isNaN(dev_start) || isNaN(dev_end))
	{
		if(cursorFlag==1){
			a = getSelectedDevanagariLetter(textArea.value,selectedLatinText[1],selectedLatinText[2]);
			latinWord = textArea.value.slice(a[0],a[1]);
			selectedLatinText= [latinWord,a[0],a[1]];

			b = getStringToBeSelected(textArea,textArea2,textArea8,selectedLatinText);
			dev_start = b[0];
			dev_end = b[1];
		}
		else
		{
			highlighttext(strngIndices[eng_word_index],strngIndices[eng_word_index]+strng.length);
			//alert("not found");
			var resultString=textArea2.slice(strngIndices[eng_word_index],strngIndices[eng_word_index]+strng.length+1);
			document.getElementById("not_found").style.display="block";
			document.getElementById("not_found").innerHTML="Selected '"+selectedLatinText[0]+"' is not a valid Devanagari string in "+resultString;
			return;
		}
	}
	highlighttext(dev_start,dev_end);
	
}
*/
function destroyHighlight(){
/*
	if(highlightFlag!=1){
		$('#result').highlightWithinTextarea('destroy');
		$('#latinText').highlightWithinTextarea('destroy');
		$('#devanagariText').highlightWithinTextarea('destroy');
		document.getElementById("not_found").style.display="none";

	}
	highlightFlag=0;		
*/}
function highlighttext(i,j){
	highlightFlag=1;
	 $('#result').highlightWithinTextarea({
		highlight: [i,j]
         
      });
}

function setFindAndReplaceFlag(){
	var textArea,replaceText;
	document.getElementById("findAndReplaceTextbox").value = '';
	document.getElementById("findReplaceTextbox").value = '';

	document.getElementById('findAndReplaceDiv').style.display='block';
	document.getElementById('findAndReplaceTextbox').focus();
	document.getElementById('findTextbox').style.display='none';
	if(flag==0)
		textArea = document.getElementById("latinText");	
	else
		textArea = document.getElementById("devanagariText");
	var text=getSelectedText(textArea);
	if(text[0]!=null){
		replaceText=text[0];
		document.getElementById("findReplaceTextbox").value=replaceText;
	}
	
}
//find and replace all
function findAndReplace(){
	if(flag==0)
		textArea = document.getElementById("latinText");	
	else
		textArea = document.getElementById("devanagariText");
	var replaceText=document.getElementById("findReplaceTextbox").value;
	var replaceWithText=document.getElementById('findAndReplaceTextbox').value;
		
	var text=textArea.value;
	var re=new RegExp(replaceText,"g")
	var outputText = text.replace(re, replaceWithText);
	//alert("outputText "+outputText);
	if(flag==0)
		document.getElementById("latinText").value = outputText;
	else
		document.getElementById("devanagariText").value = outputText;
	var resultText=conversionOnSelection(outputText);
	document.getElementById("result").value = resultText;
	document.getElementById('findAndReplaceDiv').style.display='none';
	/*textArea.selectionStart=0;
	textArea.selectionEnd=0;*/
	highlightFlag=0;
	destroyHighlight();

	
}
//merge textbox
function setFlag(){
	if(flag==1){//show latin textarea
		document.getElementById('devanagariTextButton').style.display='none';
		document.getElementById('latinTextButton').style.display='block';
		document.getElementById('devanagariDiv').style.display='none';
		document.getElementById('latinDiv').style.display='block';
		flag=0;
		loadDoc(transliterate);
	}
	else if(flag==0){//show devanagari textarea
		document.getElementById('latinTextButton').style.display='none';
		document.getElementById('devanagariTextButton').style.display='block';
		document.getElementById('devanagariDiv').style.display='block';
		document.getElementById('latinDiv').style.display='none';
		flag=1;
		loadDoc(revTransliterate);
	}
	document.getElementById('findTextbox').style.display='none';
	document.getElementById('findAndReplaceDiv').style.display='none';
	setFocus();
}

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

function findWordFlag(){
	document.getElementById('findTextbox').style.display='block';
	document.getElementById('findAndReplaceDiv').style.display='none';
	document.getElementById('findTextbox').focus();
	if(flag==0)
		textArea = document.getElementById("latinText");	
	else
		textArea = document.getElementById("devanagariText");
	var selectedText=getSelectedText(textArea);
	if(selectedText[0]!=null){
		document.getElementById('findTextbox').value=selectedText[0];
		findWord();
	}
	selectedText[0]=null;
	findFlag=1;
	/*textArea.selectionStart=0;
	textArea.selectionEnd=0;*/
}

function setHelp(){
	document.getElementById('findTextbox').style.display='none';
	document.getElementById('findAndReplaceDiv').style.display='none';
	 var x = document.getElementById("helpDiv");
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } else{
                           x.style.display = "none";
                        }
}
function highlightSubstring(word,resultword){
	highlightFlag=1;
	if(flag==0){
		$('#latinText').highlightWithinTextarea({
		 highlight: word
      		});
	}
	else{
	 	$('#devanagariText').highlightWithinTextarea({
		 highlight: word
		});
	}

	$('#result').highlightWithinTextarea({
		 highlight: resultword
      		});
	
}

function findWord(){
	highlightFlag=0;
	destroyHighlight();
	var word=document.getElementById('findTextbox').value;
	if(word==="")
	{
		$('#result').highlightWithinTextarea('destroy');
		$('#latinText').highlightWithinTextarea('destroy');
		$('#devanagariText').highlightWithinTextarea('destroy');
		return;
	}
	var resultword=conversionOnSelection(word);
	highlightSubstring(word,resultword);

}


function onChange(){
	if(flag==0)	
		loadDoc(transliterate);
	else
		loadDoc(revTransliterate);
	highlightSelectedText();
}

function getSelectedDevanagariLetter(latinWord,latinStart,latinEnd)
{
	let h_list = ["k","K","g","G","c","C","j","J","t","T","D","d","P","p","b","B","s","S"];
	let v1 = latinWord.slice(latinStart,latinEnd);
	count = 1;
	i=latinStart;
	j=latinEnd;
	let v2;
	//alert(i+" "+j);
	while(1)
	{
		if(latinStart!=0)
		{
			latinStart--;
			latinEnd--;
		}
		else
			break;
		v2 = latinWord.slice(latinStart,latinEnd);
		if(v1!=v2)
			break;
		count++;
	}
	if(count==1)
	{
		if (v1=="A"||v1=="E"||v1=="I"||v1=="O"||v1=="U")
		{
			if(v2=="h" && latinStart!=0)
			{
				latinStart--;
				latinEnd--;
				v2 = latinWord.slice(latinStart,latinEnd);
				if(h_list.indexOf(v2)>-1)
				{
					i=latinStart;
					return [i,j];
				}
			}
			i--;
			return [i,j];
		}
		var v3 = latinWord.slice(i+1,j+1);
		if(v3=="h")
		{
			j++;
			return [i,j];
		}
	}
	if(count==1 && (latinStart!=0 || v2!=" "))
	{
		if((v1=="i" || v1=="u") && v2=="a")
		{
			latinStart--;
			latinEnd--;
			v2=latinWord.slice(latinStart,latinEnd);
			if(v2!="a")
			{
				i=latinStart;
				return [i,j];
			}
			else
			{
				i=latinStart++;
				return [i,j];
			}
		}
		else if((v1=="e" || v1=="o") && v2=="a")
		{
			return[i,j];
		}
		else if(v1=="a" && (v2=="e"||v2=="i"||v2=="o"||v2=="u"))
		{
			return [i,j];
		}
		else if(v2=="h")
		{
			latinStart--;
			latinEnd--;
			v2=latinWord.slice(latinStart,latinEnd);
			if(h_list.indexOf(v2)>-1)
			{
				i=latinStart;
				return[i,j];
			}
			i--;
			return [i,j];
		}
		else
		{
			v2=latinWord.slice(i+1,j+1);
			if(v1==v2)
			{
				j++;
			}
			i--;
			return [i,j];
		}
	}
	else if(count%2==0)
	{
		if(v2==" " || (latinStart==0 && v2==v1))
		{
			i--;
			return[i,j];
		}
		else
		{
			if(v1=="a" && (v2!="e"||v2!="i"||v2!="o"||v2!="u"))
			{
				return[i,j];
			}
			else if(v1=="a" && (v2=="e"||v2=="i"||v2=="o"||v2=="u"))
			{
				i--;
				return [i,j];
			}
			else if(count==2)
			{
				if((v1=="i" || v1=="u") && v2=="a")
				{
					latinStart--;
					latinEnd--;
					v2=latinWord.slice(latinStart,latinEnd);
					if(v2!="a")
					{
						i=latinStart;
						return [i,j];
					}
					else
					{
						i=latinStart++;
						return [i,j];
					}
				}
				else if((v1=="e" || v1=="o") && v2=="a")
				{
					return[i,j];
				}
				else
				{
					//alert(i);
					i=i-2;
					return[i,j];
				}
			}
			else
			{
				i--;
				return [i,j];
			}
		}
	}
	else if(count%2!=0)
	{
		if(v1=="e"||v1=="i"||v1=="o"||v1=="u")
		{
			return [i,j];
		}
		else if(v1=="a" && (v2==" "||latinStart==0))
		{
			return [i,j];
		}
		else if(v1=="a"&& (v2!=" "||latinStart!=0))
		{
			i--;
			return [i,j];
		}
	}

}


function getStringToBeSelected(textArea,textArea2,textArea8,selectedLatinText)
{
	var wholeLatinWord = getWord(textArea.value,selectedLatinText[1],selectedLatinText[2]);//get whole word
	selectedStart= selectedLatinText[1];
	selectedEnd = selectedLatinText[2];

	var i=wholeLatinWord[1];
	var j=wholeLatinWord[2];
	var substrng = conversionOnSelection(selectedLatinText[0]);
	var strng = conversionOnSelection(wholeLatinWord[0]); ///devanagari

	var strngIndices = getIndicesOf(strng,textArea2) //result indices

	var wholeLatinWordIndices = getIndicesOf(wholeLatinWord[0],textArea.value) //latin indices
	var eng_word_index;	
	for(eng_word_index=0;eng_word_index<wholeLatinWordIndices.length;eng_word_index++)
	{
		if(wholeLatinWordIndices[eng_word_index]==i)
			break;
	}


	var arr0=getIndicesOf(selectedLatinText[0],wholeLatinWord[0]);
	var arr1=getIndicesOf(substrng,strng); //marathi indices substring
	var k;
//	alert(arr0);
	//alert("marathi word start "+strngIndices[eng_word_index]);
	var count=0;
	if(arr1.length==arr0.length){
		for(k=0;k<arr0.length;k++){
		//	alert(arr0[k]+' '+i+" "+selectedLatinText[1]);
			if((arr0[k]+i)==selectedLatinText[1]){
				break;
			}
		}
	}
	else if(arr1.length!=arr0.length){
		for(k=0;k<arr1.length;k++)
		{
		//	alert(k);
			var dummy = (strngIndices[eng_word_index]+arr1[k]);
		//	alert(dummy+'  '+selectedLatinText[1]);
			count=1;
			if(dummy>=selectedLatinText[1])
			{
				if(selectedLatinText[1]==0)
				{
					k=1;
				}
				
				break;
			}
		}
		if(count==1)
			k--;
		else
			k=-1;
		dummy=(strngIndices[eng_word_index]+arr1[k]);
		//alert(dummy+"  "+selectedLatinText[1]);
		if(   (selectedLatinText[1]-(strngIndices[eng_word_index]+arr1[k]) )>2)
			k=-1;
		if(selectedLatinText[1]>0 && dummy==0)
			k=-1;
	}
	//alert("k= "+k);
	dev_start = strngIndices[eng_word_index]+arr1[k];
	dev_end = dev_start + substrng.length;
	return [dev_start,dev_end];

}
