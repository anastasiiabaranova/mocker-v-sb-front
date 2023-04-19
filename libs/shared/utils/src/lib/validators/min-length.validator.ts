import {AbstractControl} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';

export const minLengthValidatorFactory =
	(error: string, minLength: number) => (control: AbstractControl) => {
		const value = control.value?.trim();
		const valid = !value || value.length >= minLength;

		return !valid ? {pattern: new TuiValidationError(error)} : null;
	};
