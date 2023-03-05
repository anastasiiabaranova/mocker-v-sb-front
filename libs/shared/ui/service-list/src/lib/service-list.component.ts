import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ServiceLike} from './interfaces';

@Component({
	selector: 'mocker-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent {
	@Input() services: ReadonlyArray<ServiceLike> = Array(10).fill({
		name: 'Супер сервис 1',
		mocksCount: 5,
		url: 'https://some.mocking/url',
	});

	@Input() selectedId: number | null = 2; //null;
}
