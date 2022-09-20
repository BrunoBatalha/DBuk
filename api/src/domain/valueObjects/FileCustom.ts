type FileCustomParams = {
	filename: string;
	buffer: Buffer;
	contentType: string;
	uri: string;
};

export class FileCustom {
	private constructor(
		public filename: string,
		public buffer: Buffer,
		public contentType: string,
		public uri?: string
	) { }

	static create(params: FileCustomParams): FileCustom {
		if (!params.uri) {
			throw new Error('uri file invalid');
		}

		if (!params.buffer) {
			throw new Error('buffer file invalid');
		}

		// TODO: validate content-type

		return new FileCustom(params.filename, params.buffer, params.contentType, params.uri);
	}
}
