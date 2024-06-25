import { defineConfig, type PluginOption } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { wsServer } from './src/server/ws';

export const webSocketServer: PluginOption = {
	name: 'web-socket-server',
	configureServer(server) {
		wsServer(server);
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
