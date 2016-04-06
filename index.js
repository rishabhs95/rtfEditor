function frame(){
	rtf.document.designMode = 'On';
}
function bold(){
	rtf.document.execCommand('bold',false,null); 
}
function underline(){
	rtf.document.execCommand('underline',false,null);
}
function italic(){
	rtf.document.execCommand('italic',false,null); 
}
function link(){
	var linkURL = prompt("Enter the URL for this link:", "http://"); 
	rtf.document.execCommand("CreateLink", false, linkURL);
}
function unLink(){
	rtf.document.execCommand("Unlink", false, null);
}
function foreColor(){
	rtf.document.execCommand('ForeColor',false,'ff0000');
}
function submitForm(){
	var theForm = document.getElementById("editor");
	theForm.elements["textArea"].value = window.frames['rtf'].document.body.innerHTML;
	theForm.submit();
}
