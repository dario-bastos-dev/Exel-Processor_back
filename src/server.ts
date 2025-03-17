import { serve } from 'bun';
import router from './router';

serve({
	development: true,
	port: 3000,
	routes: router,
});

console.log('Server running on port 3000');
