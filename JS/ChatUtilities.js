class ChatUtilities{

    static GetNamesFromURL()
    {
        var names = new URLSearchParams(window.location.search).get("name").split(' ');
        for (let i = 0; i < names.length; ++i)
        {
            names[i] = names[i].charAt(0).toUpperCase() + names[i].slice(1); 
        }
        return {first: names[0], last: names[names.length-1], other: names.slice(1,names.length-1)};
    }
    
    static SendMessageFromMessageBox(socket)
    {       
        var input_message = document.getElementById("message").value;
        if (!input_message) return;

        const message_object = this.#CreateMessageObject(input_message);
        const html = this.CreateMessageHTML(message_object, "input-text");

        // insert into html
        document.getElementById("output").innerHTML += html;

        // Scroll to the bottom
        window.scrollTo(0,document.body.scrollHeight);

        // Send the message to the backend for broadcast
        socket.emit("message", message_object);

        // Make the message block blank
        document.getElementById("message").value = "";
    }
    
    static CreateMessageHTML(message, css_class_name)
    {
        var last_message_sender = this.#LastMessageSender(document.getElementById("output").innerHTML);
        var name_HTML = '<div class="' + css_class_name + '" sender="' + message.name.first + '">';;
        if (last_message_sender !== message.name.first)
        { 
            name_HTML += '<small>' + message.name.first + ' ' + message.name.last + '</small><br>';
        }

        var content_HTML = message.value + '</div>';
        return name_HTML + content_HTML;
    }

    static CreateConnectionAddedHTML(message, css_class_name)
    {
        return this.#ConnectionStat(message, css_class_name, true);
    }

    static CreateConnectionRemovedHTML(message, css_class_name)
    {
        return this.#ConnectionStat(message, css_class_name, false);
    }


// Private messages
    static #LastMessageSender(string)
    {
        let i = string.lastIndexOf("sender");
        if (i === -1) return "";
        i = string.indexOf('"', i);
        i++;
        let j = string.indexOf('"', i);

        return string.substr(i, j-i);
    }

    static #ConnectionStat(message, css_class_name, connected)
    {
        let res = '<div class="';
        res += css_class_name;

        res += '" sender="server"><small>' + message.name.first + ' has just ';
        if (connected) res += 'connected! ';
        else res += 'disconnected!';
        res += '</small></div>';
        return res;
    }

    static #CreateMessageObject(input_message)
    {
        return {name: this.GetNamesFromURL(), value:input_message};
    }
};