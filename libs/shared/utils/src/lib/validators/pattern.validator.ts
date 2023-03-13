import {AbstractControl} from '@angular/forms';

export const patternValidatorFactory =
	(error: string, pattern: RegExp) => (control: AbstractControl) => {
		const value = control.value?.trim();
		const valid = pattern.test(value);

		return valid ? {pattern: error} : null;
	};
