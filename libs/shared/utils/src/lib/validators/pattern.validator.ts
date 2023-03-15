import {AbstractControl} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';

export const patternValidatorFactory =
	(error: string, pattern: RegExp) => (control: AbstractControl) => {
		const value = control.value?.trim();
		const valid = pattern.test(value);

		return !valid ? {pattern: new TuiValidationError(error)} : null;
	};
