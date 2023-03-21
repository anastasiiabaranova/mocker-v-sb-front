import {AbstractControl} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';

export const forbiddenValueValidatorFactory =
	(error: string, forbiddenValue: string) => (control: AbstractControl) => {
		const value = control.value?.trim();

		return value === forbiddenValue
			? {required: new TuiValidationError(error)}
			: null;
	};
