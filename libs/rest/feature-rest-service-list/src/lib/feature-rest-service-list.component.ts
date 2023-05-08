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
import {CreateRestServiceDialogComponent} from '@mocker/shared/ui';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {takeUntil} from 'rxjs';

@Component({
	selector: 'mocker-feature-rest-service-list',
	templateUrl: './feature-rest-service-list.component.html',
	styleUrls: ['./feature-rest-service-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class FeatureRestServiceListComponent implements OnInit {
	readonly services$ = this.facade.services$;
	readonly selectedServicePath$ = this.facade.servicePath$;

	readonly skeletons = Array(20);

	constructor(
		private readonly facade: RestFacade,
		private readonly router: Router,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector,
		private readonly destroy$: TuiDestroyService
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
					CreateRestServiceDialogComponent,
					this.injector
				)
			)
			.pipe(takeUntil(this.destroy$))
			.subscribe();
	}

	searchServices(search: string | null) {
		this.facade.loadServices(search || '');
	}
}
