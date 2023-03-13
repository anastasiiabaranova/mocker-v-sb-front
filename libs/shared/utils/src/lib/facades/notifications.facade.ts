import {Injectable} from '@angular/core';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

type NotificationConfig = {
	label?: string;
	content: string;
	status: TuiNotification;
};

@Injectable({
	providedIn: 'root',
})
export class NotificationsFacade {
	constructor(private readonly alertService: TuiAlertService) {}

	showNotification(config: NotificationConfig): void {
		const {label, status} = config;

		this.alertService.open(config.content, {label, status}).subscribe();
	}
}
