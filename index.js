var linkCounter = 0;
function frame(){
	rtf.document.designMode = 'On';
}
function bold(){
	rtf.document.execCommand('bold',false,null); 
}
function underline(){
	rtf.document.execCommand('underline',false,null);
}
function link(){
	var linkURL = prompt("Enter the URL for this link:", "http://"); 
	rtf.document.execCommand("CreateLink", false, linkURL);
	if (linkCounter%2 == 0)
		$('<li> <a href="' + linkURL + '">'+ linkURL +'</a></li>').appendTo('#links');
	else
		$('<li> <a style="color:red;" href="' + linkURL + '">'+ linkURL +'</a></li>').appendTo('#links');
	linkCounter += 1;
}
function foreColor(){
	rtf.document.execCommand('ForeColor',false,'ff0000');
}
function submitForm(){
	var theForm = document.getElementById("editor");
	theForm.elements["textArea"].value = window.frames['rtf'].document.body.innerHTML;
	theForm.submit();
}
