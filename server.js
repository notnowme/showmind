const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const http = require('http');
const socketIO = require('socket.io');

app.prepare().then(async() => {
    const server = express();
    const httpServer = http.createServer(server);
    const io = socketIO(httpServer);

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('msg', async(data, cb) => {
            console.log('recived msg');
            io.to(data.rid).emit('msg-server', {user: data.user, msg: data.msg})
            return cb({ok: true});
        });

        socket.on('joinRoom', (data, cb) => {
            console.log(data);
            socket.join(data.rid)
            io.emit('joinRoom-msg', data.user);
            return cb({ok: true});
        })
    });

    server.all('*', (req, res) => {
        return handle(req, res)
    });
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log('server is running...');
    });
})