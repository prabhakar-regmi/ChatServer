var socket = io();

var names = ChatUtilities.GetNamesFromURL();
socket.emit("connection-successful", names);

// Document's events
$(document).ready(()=>
{
    var full_name = names.first;
    if (names.second) full_name += " " + names.last;
    document.getElementById("chat-title").innerHTML += "Chat : " + full_name;
    
    //  Click event on the send button
    $("#send").click((e)=>{
        e.preventDefault();
        ChatUtilities.SendMessageFromMessageBox(socket);
    });

    // Enter event on the message-box
    $("#message").on("keypress", function(e){
        if (e.keyCode === 13 && !e.shiftKey)
        {
            e.preventDefault();
            ChatUtilities.SendMessageFromMessageBox(socket);
        }
    });

    // -------------------------------------------
    // SOCKET IO Event Listeners
    // -------------------------------------------
    socket.on("display-message",(data)=>{
        var d1 = document.getElementById("output");
        d1.innerHTML += ChatUtilities.CreateMessageHTML(data,"output-text");
        window.scrollTo(0,document.body.scrollHeight);
    });

    socket.on("connected", (data)=>{
        document.getElementById("output").innerHTML +=  ChatUtilities.CreateConnectionAddedHTML(data, "connection-stats");
        window.scrollTo(0,document.body.scrollHeight);
    });

    socket.on("disconnected", (data)=>{
        var d1 = document.getElementById("output").innerHTML += ChatUtilities.CreateConnectionRemovedHTML(data, "connection-stats");
        window.scrollTo(0,document.body.scrollHeight);
    });
});