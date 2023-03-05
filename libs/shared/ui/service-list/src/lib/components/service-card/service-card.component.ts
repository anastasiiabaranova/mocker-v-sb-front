import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ServiceLike} from '../../interfaces';

@Component({
	selector: 'mocker-service-card',
	templateUrl: './service-card.component.html',
	styleUrls: ['./service-card.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
	@Input() service!: ServiceLike;
}
