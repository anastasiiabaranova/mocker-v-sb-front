import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {RestFacade} from '@mocker/rest/domain';
import {
	AppConfig,
	ENVIRONMENT,
	patternValidatorFactory,
	requiredValidatorFactory,
} from '@mocker/shared/utils';
import {
	TuiDay,
	tuiMarkControlAsTouchedAndValidate,
	TuiTime,
} from '@taiga-ui/cdk';
import {TuiDialogContext} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

const NAME_REQUIRED_ERROR = 'Укажите имя сервиса';
const PATH_REQUIRED_ERROR = 'Укажите путь сервиса';
const PATH_FORMAT_ERROR = 'Некорректный путь';

const PATH_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]*[a-zA-Z0-9]+$/;

@Component({
	selector: 'mocker-create-service-dialog',
	templateUrl: './create-service-dialog.component.html',
	styleUrls: ['./create-service-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateServiceDialogComponent {
	readonly form = this.formBuilder.group({
		name: [null, requiredValidatorFactory(NAME_REQUIRED_ERROR)],
		path: [
			null,
			[
				requiredValidatorFactory(PATH_REQUIRED_ERROR),
				patternValidatorFactory(PATH_FORMAT_ERROR, PATH_PATTERN),
			],
		],
		expirationTime: [null],
		description: [null],
	});

	readonly minDateTime = [
		TuiDay.currentLocal(),
		TuiTime.currentLocal().shift({hours: 1}),
	] as [TuiDay, TuiTime];

	readonly mockServiceUrl = `${this.appConfig.serverUrl}/rest/{path}`;

	constructor(
		@Inject(ENVIRONMENT) private readonly appConfig: AppConfig,
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext,
		private readonly formBuilder: FormBuilder,
		private readonly facade: RestFacade
	) {}

	closeDialog() {
		this.context.completeWith();
	}

	submitService() {
		if (this.form.invalid) {
			tuiMarkControlAsTouchedAndValidate(this.form);
			return;
		}

		this.facade.createService(this.form.value as any);
		this.closeDialog();
	}
}
