import { addRoom, rooms } from '$lib/stores/rooms.store';

import type { PageLoad } from './$types';
import { writable } from 'svelte/store';

export const load: PageLoad = ({ params }) => {
	console.log(typeof window === 'undefined' ? 'Server' : 'Client');

	const { roomId } = params;

	const userId = writable();
	let id;

	if (typeof sessionStorage !== 'undefined') {
		id = userId.subscribe((value) => {
			if (!sessionStorage.getItem('userId')) {
				console.log('setting userId');
				sessionStorage.setItem('userId', crypto.randomUUID());
			}

			console.log('getting userId', localStorage.getItem('userId'));
			id = sessionStorage.getItem('userId');
		});

		userId.set(id);
	}

	if (!rooms.find((room) => room.id === roomId)) {
		addRoom({
			id: roomId,
			users: []
		});
	}

	console.log(rooms);

	return {
		userId: id,
		roomId
	};
};
