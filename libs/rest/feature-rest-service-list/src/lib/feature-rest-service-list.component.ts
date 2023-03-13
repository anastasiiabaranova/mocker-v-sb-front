import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestFacade} from '@mocker/rest/domain';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {map} from 'rxjs';
import {CreateServiceDialogComponent} from './components';

@Component({
	selector: 'mocker-feature-rest-service-list',
	templateUrl: './feature-rest-service-list.component.html',
	styleUrls: ['./feature-rest-service-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRestServiceListComponent implements OnInit {
	readonly services$ = this.facade.services$;

	readonly selectedServicePath$ = this.route.params.pipe(map(({id}) => id));

	constructor(
		private readonly facade: RestFacade,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly dialogService: TuiDialogService
	) {}

	ngOnInit(): void {
		this.facade.loadServices();
	}

	openService(path: string) {
		this.router.navigate(['/rest-api', path]);
	}

	addService() {
		this.dialogService
			.open<number>(
				new PolymorpheusComponent(CreateServiceDialogComponent),
				{
					dismissible: true,
					// label: 'Новый REST сервис',
				}
			)
			.subscribe();
	}
}
