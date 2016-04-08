var linkCounter = 0;

function frame() {
    rtf.document.designMode = 'On';
}

function bold() {
    rtf.document.execCommand('bold', false, null);
}

function underline() {
    rtf.document.execCommand('underline', false, null);
}

function link() {
    var linkURL = prompt("Enter the URL for this link:", "http://");
    if (linkURL !== null) {
    	rtf.document.execCommand("CreateLink", false, linkURL);
	    if (linkCounter % 2 == 0)
	        $('<li> <a href="' + linkURL + '">' + linkURL + '</a></li>').appendTo('#links');
	    else
	        $('<li> <a style="color:red;" href="' + linkURL + '">' + linkURL + '</a></li>').appendTo('#links');
	    linkCounter += 1;
	}
}

function foreColor() {
    rtf.document.execCommand('ForeColor', false, 'ff0000');
}

function submitForm() {
    var theForm = document.getElementById("editor");
    theForm.elements["textArea"].value = window.frames['rtf'].document.body.innerHTML;
    theForm.submit();
}

// replacing all four lettered words to random words
function randomize() {
	var text = window.frames['rtf'].document.body.innerHTML;
	// preprocessing text
	console.log(text);
	for (var i=0; i<text.length; i++) {
		if (text[i] === '>')
			text = text.substring(0, i+1) + ' ' + text.substring(i+1, text.length);
		else if (text[i] === '<') {
			text = text.substring(0, i) + ' ' + text.substring(i, text.length);
			i++;
		}
		else if (text[i] === '.' || text[i] === ',') {
			text = text.substring(0, i) + ' ' + text.substring(i, text.length);
			i++;
		}
	}
	console.log(text);
	//replacing with random words
	if (text !== '') {
		var words = text.split(' ');
	    for (var i = 0; i < words.length; i++) {
	        if (words[i].length === 4) {
	        	if (words[i][0] !== '<' || words[i][3] !== '>') {
	        		console.log("init " + words[i]);
	        		jQuery.ajaxSetup({async:false});
	        		$.get("http://randomword.setgetgo.com/get.php", function(data){
						words[i] = data;
					});
					console.log("final " + words[i]);
	        	}
	        }
	    }
	    text = '';
	    for (var i = 0; i < words.length; i++) {
	    	if (words[i+1] !== '.' && words[i+1] !== ',')
	    		text += ' ';
	    	text += words[i];
	    }
	    window.frames['rtf'].document.body.innerHTML = text;
	}
	console.log(text);
}

// entering a new paragraph on every newline
rtf.addEventListener('keypress', function(e) {
    if (e.keyCode == '13') {
        e.preventDefault();
        rtf.document.execCommand('insertParagraph', false);
        rtf.document.execCommand('formatBlock', false, 'p');
    }
}, false);

// tooltip on text selection
$(rtf).bind('mouseup', function(e){
    var selection;
    
    if (window.frames['rtf'].getSelection) {
    	selection = window.frames['rtf'].getSelection();
    } else if (window.frames['rtf'].document.selection) {
    	selection = window.frames['rtf'].document.selection.createRange();
    }
    
    if (selection.toString() !== '') {
    	console.log(selection);
    	//alert('"' + selection.toString() + '" was selected at ' + e.pageX + '/' + e.pageY);
    }
});

//draggable and droppable paragraphs