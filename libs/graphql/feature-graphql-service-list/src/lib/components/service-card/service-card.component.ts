import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {GraphQLServiceShortDto} from '@mocker/graphql/domain';

@Component({
	selector: 'mocker-service-card',
	templateUrl: './service-card.component.html',
	styleUrls: ['./service-card.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
	@Input() service!: GraphQLServiceShortDto;
}
