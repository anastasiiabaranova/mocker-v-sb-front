import {
	ChangeDetectionStrategy,
	Component,
	Injector,
	OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {RestFacade} from '@mocker/rest/domain';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {CreateServiceDialogComponent} from '@mocker/shared/ui/rest';

@Component({
	selector: 'mocker-feature-rest-service-list',
	templateUrl: './feature-rest-service-list.component.html',
	styleUrls: ['./feature-rest-service-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRestServiceListComponent implements OnInit {
	readonly services$ = this.facade.services$;
	readonly selectedServicePath$ = this.facade.servicePath$;

	constructor(
		private readonly facade: RestFacade,
		private readonly router: Router,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector
	) {}

	ngOnInit(): void {
		this.facade.loadServices();
	}

	openService(path: string) {
		this.router.navigate(['rest-api', path]);
	}

	createService() {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateServiceDialogComponent,
					this.injector
				)
			)
			.subscribe();
	}

	searchServices(search: string | null) {
		this.facade.loadServices(search || '');
	}
}
