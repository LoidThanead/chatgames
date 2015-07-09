var takeTurnShortCut = 'ctrl+q';

var socket = io.connect();

function addMessage(msg, pseudo)
{
    $('#chatEntries').append('<div class="message"><p>' + pseudo + ' : ' + msg + '</p></div>');
}

function sendMessage()
{
	var message = $('#messageInput').val();
    if (message != "") 
    {
        socket.emit('message', message);
		var now = new Date().toISOString();
        addMessage(message, "Me", now, true);
        $('#messageInput').val('');
    }
}

function setPseudo()
{
	var pseudonym = $("#pseudoInput").val();
    if (pseudonym != "")
    {
		// Send the chosen pseudonym to the server.
        socket.emit('setPseudo', pseudonym);
		
		// Hide pseudonym settings.
        $("#pseudoInput").hide();
        $("#pseudoSet").hide();
		
		// Show chat controls.
        $("#chatControls").show();
		
		// Set focus to the message input field.
		$('#messageInput').focus();
    }
}

function takeTurn()
{
	socket.emit('taketurn');
}

// Receives messages from the server.
socket.on('message', function(data)
{
    addMessage(data['message'], data['pseudo']);
});

$(function()
{	
	var pseudoInput = $("#pseudoInput");
	var setPseudoButton = $('#pseudoSet');
	var messageInput = $('#messageInput');
	var sendMessageButton = $("#submit");
	var takeTurnButton = $("#takeTurn");

	var chatEntries = $("#chatEntries");
	var chatControls = $('#chatControls');
	
    chatControls.hide();
	
	// Set pseudo when clicking 'set pseudo' or pressing enter in the input field.
	pseudoInput.bind('keydown', 'return', setPseudo);
    setPseudoButton.click(setPseudo);
	
	// Send message when clicking 'send' or pressing enter in the input field.
    sendMessageButton.click(sendMessage);
	messageInput.bind('keydown', 'return', sendMessage);
	
	// Send 'roll die' action when clicking the button or when pressing the hotkeys.
	takeTurnButton.click(takeTurn);
	$(document).bind('keydown', takeTurnShortCut, takeTurn);
	
	// Set focus to the 'pseudo' field on startup.
	pseudoInput.focus();
});