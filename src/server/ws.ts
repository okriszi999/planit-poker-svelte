import { addUserToRoom, getRoom, rooms } from '../lib/stores/rooms.store';

import { Server } from 'socket.io';
import type { ViteDevServer } from 'vite';

export function wsServer(server: ViteDevServer) {
	const io = new Server(server.httpServer!);

	io.on('connection', (socket) => {
		socket.emit('eventFromServer', {
			message: 'Hello from the server! 👋🏼'
		});

		socket.on('joinRoom', (data) => {
			socket.join(data.roomId);

			addUserToRoom(data.roomId, data.userId);

			console.log(getRoom(data.roomId));
			console.log(rooms);

			io.to(data.roomId).emit('userJoinedTheRoomSuccessfully', {
				room: getRoom(data.roomId)
			});
		});

		socket.on('eventFromClient', (data) => {
			console.log(data);

			io.emit('messageMutatedFromServer', {
				message: `${data} from the server! 🚀`
			});
		});
	});
}
