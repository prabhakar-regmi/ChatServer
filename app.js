const express = require('express');
const socket = require('socket.io');

// Server Setup
const port_number = process.env.PORT || 1000;
const server = require('./SetUpApp.js').SetupServer(express, port_number);

// Socket.io object
let io = socket(server);

// map of socket and the info of the user connected to it
let user_name_map = new Map();

// Socket.io event listeners
io.on('connection', (socket)=>{    
    socket.on('connection-successful', (data)=>
    {  
        socket.broadcast.emit('connected', {name: data});     
        user_name_map.set(socket, data);
        console.log(`${data.first} has connected`)
    });

    socket.on('disconnect', ()=>{
        var curr_data = user_name_map.get(socket);
        let cloned_data = Object.assign({}, user_name_map.get(socket));
        cloned_data = {name:cloned_data};
        socket.broadcast.emit('disconnected', cloned_data);        
        user_name_map.delete(socket);
    });
    
    socket.on('message', (data)=>{
        socket.broadcast.emit('display-message', data);
    });
});