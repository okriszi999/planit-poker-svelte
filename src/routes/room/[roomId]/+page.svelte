<script lang="ts">
	import { io } from 'socket.io-client';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { addUserToRoom, rooms, getRoom, removeUserFromRoom } from '$lib/stores/rooms.store';

	export let data: PageData;

	const socket = io();

	socket.on('connect', () => {
		console.log('user connected with id: ', data.userId);

		console.log(socket.id);

		socket.emit('joinRoom', {
			roomId: data.roomId,
			userId: data.userId
		});

		socket.on('userJoinedTheRoomSuccessfully', (message) => {
			console.log('room joined successfully', message);
		});
	});

	onMount(() => {
		const id = data.userId as unknown as string;
	});

	onDestroy(() => {
		const id = data.userId as unknown as string;
	});
</script>
