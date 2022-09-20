import aws from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { FileCustom } from '../../domain/valueObjects/FileCustom';

export class S3Storage {
	static async saveFile(filename: string, filePath: any): Promise<string> {
		const s3Client = new aws.S3({
			region: 'us-east-1',
			credentials: {
				accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
				secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET as string
			}
		});

		const path_ = path.resolve(__dirname, '..', '..', '..', 'tmp', 'tmp-1-1663640292954.png');
		const filestream = fs.createReadStream(path_);
		const contentType = mime.getType(path_) as string;

		try {
			const uploaded = await s3Client
				.upload({
					Body: filestream,
					Bucket: process.env.AWS_S3_BUCKET_NAME as string,
					ACL: 'public-read',
					Key: filename,
					ContentType: contentType
				})
				.promise();

			fs.unlinkSync(filePath);

			return uploaded.Location;
		} catch (error) {
			console.error(error);
			throw new Error('Error uploaded S3');
		}
	}
	static async saveFile2(file: FileCustom): Promise<string> {
		const s3Client = new aws.S3({
			region: 'us-east-1',
			credentials: {
				accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
				secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET as string
			}
		});

		try {
			const uploaded = await s3Client
				.upload({
					Body: file.buffer,
					Bucket: process.env.AWS_S3_BUCKET_NAME as string,
					ACL: 'public-read',
					Key: file.filename,
					ContentType: file.contentType
				})
				.promise();

			return uploaded.Location;
		} catch (error) {
			console.error(error);
			throw new Error('Error uploaded S3');
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
