import { writable } from 'svelte/store';

type Room = {
	id: string;
	users: string[];
};

export const rooms = [] as Room[];

export const getRoom = (roomId: string) => {
	return rooms.find((room) => room.id === roomId);
};

export const addRoom = (room: Room) => {
	rooms.push(room);
};

export const removeRoom = (roomId: string) => {
	const index = rooms.findIndex((room) => room.id === roomId);

	if (index !== -1) {
		rooms.splice(index, 1);
	}
};

export const addUserToRoom = (roomId: string, userId: string) => {
	console.log('adding user', userId, 'to room', roomId);
	const room = rooms.find((room) => room.id === roomId);

	if (room) {
		room.users.push(userId);
	}
};

export const removeUserFromRoom = (roomId: string, userId: string) => {
	const room = rooms.find((room) => room.id === roomId);

	if (room) {
		const index = room.users.findIndex((user) => user === userId);

		if (index !== -1) {
			room.users.splice(index, 1);
		}
	}
};
