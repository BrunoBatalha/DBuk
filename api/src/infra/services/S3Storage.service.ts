import aws from 'aws-sdk';
import { FileCustom } from '../../domain/valueObjects/FileCustom';

export class S3Storage {
	static async saveFile(file: FileCustom): Promise<string> {
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
