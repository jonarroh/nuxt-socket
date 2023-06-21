import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000'
	}
});

io.on('connection', socket => {
	console.log('a user connected', socket.id);
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('message', msg => {
		console.log('message: ' + msg);
		socket.broadcast.emit('message', msg);
	});
});

httpServer.listen(3001, () => {
	console.log('listening on *:3000');
});
