/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter()
	}
};

export default config;
