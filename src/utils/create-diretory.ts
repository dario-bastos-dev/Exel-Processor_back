import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function ensureUploadDirectoryExists() {
	const uploadPath = path.join(__dirname, '../../', 'uploads');
	if (!fs.existsSync(uploadPath)) {
		fs.mkdirSync(uploadPath, { recursive: true });
		console.log(`Created uploads directory at ${uploadPath}`);
	}
}
