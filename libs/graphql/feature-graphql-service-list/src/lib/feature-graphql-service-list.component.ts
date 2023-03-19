import {
	ChangeDetectionStrategy,
	Component,
	Injector,
	OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {GraphQLFacade} from '@mocker/graphql/domain';
import {CreateGraphQLServiceDialogComponent} from '@mocker/shared/ui';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

@Component({
	selector: 'mocker-feature-graphql-service-list',
	templateUrl: './feature-graphql-service-list.component.html',
	styleUrls: ['./feature-graphql-service-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGraphQLServiceListComponent implements OnInit {
	readonly services$ = this.facade.services$;
	readonly selectedServiceId$ = this.facade.serviceId$;

	readonly skeletons = Array(20);

	constructor(
		private readonly facade: GraphQLFacade,
		private readonly router: Router,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector
	) {}

	ngOnInit(): void {
		this.facade.loadServices();
	}

	openService(id: string) {
		this.router.navigate(['graphql', id]);
	}

	createService() {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateGraphQLServiceDialogComponent,
					this.injector
				),
				{size: 'l'}
			)
			.subscribe();
	}

	searchServices(search: string | null) {
		this.facade.loadServices(search || '');
	}
}
