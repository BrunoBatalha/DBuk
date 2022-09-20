import { FileCustom } from '../../domain/valueObjects/FileCustom';
import { S3Storage } from './S3Storage.service';

export class ImageService {
	static async uploadImageToCloud(file: any): Promise<string> {
		return await S3Storage.saveFile(new Date().getTime().toString(), file);
	}

	static async uploadImageToCloud2(file: FileCustom): Promise<string> {
		return await S3Storage.saveFile2(file);
	}
}
