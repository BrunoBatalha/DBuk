export type ErrorMessage = {
	code: string;
	message: string;
};

export class ErrorMessageManager {
	private errorMessages: ErrorMessage[] = [];

	add(errorMessage: ErrorMessage): void {
		this.errorMessages.push(errorMessage);
	}

	addWithPlaceholder(errorMessage: ErrorMessage, placeholders: { [k: string]: string | number }): void {
		this.errorMessages.push({
			code: errorMessage.code,
			message: this.replacePlaceholders(errorMessage.message, placeholders)
		});
	}

	private replacePlaceholders(text: string, placeholders: { [k: string]: string | number }): string {
		for (const propertyName in placeholders) {
			const rexex = new RegExp('{' + propertyName + '}', 'gm');
			text = text.replace(rexex, placeholders[propertyName].toString());
		}
		return text;
	}

	hasError(): boolean {
		return this.errorMessages.length > 0;
	}

	getList(): ErrorMessage[] {
		return this.errorMessages;
	}
}
