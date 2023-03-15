import {AbstractControl} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';

export const requiredValidatorFactory =
	(error: string, trim: boolean = false) =>
	(control: AbstractControl) => {
		const value = trim ? control.value?.trim() : control.value;

		return !value ? {required: new TuiValidationError(error)} : null;
	};
