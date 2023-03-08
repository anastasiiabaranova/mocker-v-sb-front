import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mapTo} from 'rxjs';
import {GraphQLServiceDto} from '@mocker/graphql/domain';

@Component({
	selector: 'mocker-feature-graphql-service',
	templateUrl: './feature-graphql-service.component.html',
	styleUrls: ['./feature-graphql-service.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGraphqlServiceComponent {
	readonly service$ = this.route.params.pipe(
		map(({id}) => id),
		mapTo({
			name: 'Супер сервис 1',
			location: 'super-service.ru/umpla/lumpa',
			ttl: 120,
		})
	);

	readonly getDisplayTtl = ({ttl}: GraphQLServiceDto) =>
		ttl ? `${ttl} мин` : 'Постоянный';

	constructor(private readonly route: ActivatedRoute) {}
}
