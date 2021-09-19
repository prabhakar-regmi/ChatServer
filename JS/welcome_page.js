function MoveOnToTheChat(name)
{
    // HTTP connection to pass the username to the chat
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './api/chat', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({username: name}));
    
    // when the request in the server side is complete
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            location.href = xhr.responseURL;
        }
    }
}

$(document).ready(()=>{
    $("#login").click((event)=>{
        var name = document.getElementById("name").value;
        if (name === '') return;
        MoveOnToTheChat(name);
    });

    $("#name").on("keypress", function(e){
        if (e.keyCode === 13)
        {
            e.preventDefault();
            var name = document.getElementById("name").value;
            if (name === '') return;
            MoveOnToTheChat(name);
        }
    });

});


