import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
	AppConfig,
	ENVIRONMENT,
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {TuiDay, TuiTime} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

const NAME_REQUIRED_ERROR = 'Укажите имя сервиса';
const PATH_REQUIRED_ERROR = 'Укажите путь сервиса';
const PATH_FORMAT_ERROR = 'Некорректный путь';
const URL_FORMAT_ERROR = 'Некорректный URL';

const PHONE_PATTERN = /[a-zA-Z0-9]+[a-zA-Z0-9\-_]*[a-zA-Z0-9]+/;
const URL_PATTERN =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

@Component({
	selector: 'mocker-create-service-dialog',
	templateUrl: './create-service-dialog.component.html',
	styleUrls: ['./create-service-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateServiceDialogComponent {
	readonly form = this.formBuilder.group({
		name: [null, requiredValidatorFactory(NAME_REQUIRED_ERROR)],
		url: [null, patternValidatorFactory(URL_FORMAT_ERROR, URL_PATTERN)],
		path: [
			null,
			[
				requiredValidatorFactory(PATH_REQUIRED_ERROR),
				patternValidatorFactory(PATH_FORMAT_ERROR, PHONE_PATTERN),
			],
		],
		description: [null],
		expirationTime: [null],
	});

	readonly minDateTime = [
		TuiDay.currentLocal(),
		TuiTime.currentLocal().shift({hours: 1}),
	] as [TuiDay, TuiTime];

	readonly mockServiceUrl = `${this.appConfig.serverUrl}/rest/{path}`;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<number, number>,
		private readonly formBuilder: FormBuilder
	) {}
}
