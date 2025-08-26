import {
	createSSRApp
} from "vue";

import App from "./App.vue";

import {createPinia } from "pinia"

import "./static/index.css"

export function createApp() {
	const app = createSSRApp(App);	
	const store=createPinia()
	app.use(store);
	return {
		app
	};
}
