import fs from 'fs';
import path from 'path';
import { FileCustom } from '../../domain/valueObjects/FileCustom';

export class LocalStorage {
	static async saveFile(file: FileCustom): Promise<string> {
		try {
			const pathFile = path.join('uploads', file.filename);
			await fs.writeFileSync(pathFile, file.buffer);

			return `${process.env.HOST}:${process.env.PORT}/${file.filename}`;
		} catch (error) {
			console.error(error);
			await fs.unlinkSync(path.join(__dirname, file.filename));
			throw new Error('Error uploaded local folder');
		}
	}
	// async deleteFile(filename: string): Promise<void> {
	// 	await this.client
	// 		.deleteObject({
	// 			Bucket: 'aula-youtube',
	// 			Key: filename
	// 		})
	// 		.promise();
	// }
}
