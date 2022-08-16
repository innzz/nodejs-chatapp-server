const io = require('socket.io')(5000);

const users = {};

io.on('connection',socket=>{
    //If new user joins, let other users connected to the server know!
    socket.on('new-user-joined',name=>{
        // console.log(name, socket.id);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        // console.log(users)
    });

    //If someone sends message, broadcast it to other people
    socket.on('send', message=>{
        socket.broadcast.emit('receieve',{message: message, name : users[socket.id]});
    });

    //If someone leaves the chat, let others know
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
        // console.log(users[socket.id])
    });
})