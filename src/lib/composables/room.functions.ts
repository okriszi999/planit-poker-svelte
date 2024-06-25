export const playerJoin = (roomId: string, userId: string) => {
	return {
		roomId,
		userId
	};
};

export const createRoom = (roomId: string) => {
	return {
		roomId
	};
};
