//This function retrieves the messages from the chat
function getMessage() {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) { return false; }

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let top_field = document.getElementById('top');
            top_field.innerHTML = httpRequest.responseText;
            top_field.scrollTop = top_field.scrollHeight;
        } else { alert('Response failure: ' + Response.status); }
        }
    }
    let url = '/chats';
    httpRequest.open('GET', url);
    httpRequest.send();
}

//This function posts new messages to the chat
function sendMessage() {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) { return false; }
    
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
        } else { alert('Response failure: ' + Response.status); }
        }
    }
    
    let alias = document.getElementById('alias').value;
    let message = document.getElementById('message').value;
    let url = '/chats/post/' + encodeURIComponent(alias) + '/' + encodeURIComponent(message);
    if (alias.length > 0 && message.length > 0) {
        httpRequest.open('POST', url);
        httpRequest.send();
    }
}

//This function clears the history of the chat (clears the database)
function clearChat() {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) { return false; }

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let top_field = document.getElementById('top');
            top_field.innerHTML = httpRequest.responseText;
            top_field.scrollTop = top_field.scrollHeight;
        } else { alert('Response failure: ' + Response.status); }
        }
    }

    let url = '/clear';
    httpRequest.open('GET', url);
    httpRequest.send();
}

//This function clears the input text field whenever data is send to the server
function clearField() {
    document.getElementById('message').value = '';
}

setInterval(() => getMessage(), 1000);

