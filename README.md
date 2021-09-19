# ChatServer
This is a simple one-to-many chat server created using Nodejs, JS, HTML, Bootstrap CSS, and Sockets.io

In the first HTML page, a user is able to sign in the chat server using his/her username.
In the secone page, all the users are able to chat!

## How To Run

On a system with `NodeJS`, `express` and `socketio` installed, one can just start the server using:

`` node app.js ``

The server is setup either in the port set as an environment variable, or 1000. So, you can access the server using:
`` http://localhost:10000 ``

## Program Structure

The entry point to the program is ``app.js`` - This file consists majorly the *socket.io* event listeners and emitters. This file also uses the content of ``SetUpServer.js`` to set-up the *express* server and listen on it on the given port. The ``SetUpServer.js`` has the `GET` and `POST` methods on the app that is used to redirect to the appropriate HTML.

The HTMLs, CSSs and JS are located in their own folders. There are 2 HTMLs - one for the welcome page and the other for the chat page. There's only 1 CSS file that handles both these HTML files - ``style.css``. There are JS files - 2 corresponding to the HTMLs (sharing the same name), and 1 consisting of Utility functions needed to get the message in between the server and client.

## Developer

This program is developed by Prabhakar Regmi, as a learning experience - learning NodeJS, JS and HTML!


