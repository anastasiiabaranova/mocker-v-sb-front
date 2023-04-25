import {AbstractControl} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';

const URL_PATTERN =
	/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/i;

export const urlValidatorFactory =
	(error: string) => (control: AbstractControl) => {
		const value = control.value?.trim();
		const valid = !value || URL_PATTERN.test(value);

		return !valid ? {pattern: new TuiValidationError(error)} : null;
	};
