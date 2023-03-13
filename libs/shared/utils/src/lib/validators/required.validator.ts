import {AbstractControl} from '@angular/forms';

export const requiredValidatorFactory =
	(error: string, trim: boolean = false) =>
	(control: AbstractControl) => {
		const value = trim ? control.value?.trim() : control.value;

		return value ? {required: error} : null;
	};
