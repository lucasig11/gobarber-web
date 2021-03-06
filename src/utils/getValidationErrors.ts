import { ValidationError } from 'yup';

interface ErrorData {
	[key: string]: string;
}

export default function getValidationErrors(err: ValidationError): ErrorData {
	const validationErrors: ErrorData = {};

	err.inner.forEach((error) => {
		if (!error.path) {
			return;
		}

		validationErrors[error.path] = error.message;
	});

	return validationErrors;
}
