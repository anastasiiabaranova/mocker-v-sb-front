import {AbstractControl} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';

export const maxLengthValidatorFactory =
	(error: string, maxLength: number) => (control: AbstractControl) => {
		const value = control.value?.trim();
		const valid = !value || value.length <= maxLength;

		return !valid ? {pattern: new TuiValidationError(error)} : null;
	};
