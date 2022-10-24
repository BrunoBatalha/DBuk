import { FileCustom } from '../../domain/valueObjects/FileCustom';
import { LocalStorage } from './LocalStorage.service';
import { S3Storage } from './S3Storage.service';

export class ImageService {
	static async uploadImageToCloud(file: FileCustom): Promise<string> {
		if (process.env.STORAGE_TYPE === 'aws') {
			return await S3Storage.saveFile(file);
		} else {
			return await LocalStorage.saveFile(file);
		}
	}
}
