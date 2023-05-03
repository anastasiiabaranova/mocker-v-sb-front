import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injector,
	Output,
} from '@angular/core';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {GraphQLFacade, GraphQLMockDto} from '@mocker/graphql/domain';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import {BehaviorSubject, combineLatest, map} from 'rxjs';
import {GraphQLTriggersDialogComponent} from '../graphql-triggers-dialog/graphql-triggers-dialog.component';

function sliceArray(mocks: any, page: number, size: number) {
	return (mocks || []).slice(page * size, page * size + size);
}

@Component({
	selector: 'mocker-graphql-mock-list',
	templateUrl: './graphql-mock-list.component.html',
	styleUrls: ['./graphql-mock-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class GraphQLMockListComponent {
	readonly page$ = new BehaviorSubject<number>(0);
	readonly size$ = new BehaviorSubject<number>(5);

	readonly mocks$ = this.facade.mocks$;

	readonly displayMocks$ = combineLatest([
		this.facade.mocks$,
		this.page$,
		this.size$,
	]).pipe(map(([mocks, page, size]) => sliceArray(mocks, page, size)));

	@Output() readonly createMock = new EventEmitter<void>();
	@Output() readonly editMock = new EventEmitter<GraphQLMockDto>();
	@Output() readonly deleteMock = new EventEmitter<GraphQLMockDto>();
	@Output() readonly deleteAll = new EventEmitter<void>();

	readonly columns = ['name', 'expirationDate', 'actions'];
	readonly sizeOptions = [5, 10, 20];

	readonly getDateTime = (expirationDate?: string) =>
		expirationDate
			? format(Date.parse(expirationDate), 'dd.MM.yyyy, HH:mm', {
					locale: ru,
			  })
			: '';

	constructor(
		private readonly dialogService: TuiDialogService,
		private readonly facade: GraphQLFacade,
		private readonly injector: Injector
	) {}

	openTriggersFor(mock: GraphQLMockDto) {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					GraphQLTriggersDialogComponent,
					this.injector
				),
				{data: mock, size: 'm'}
			)
			.subscribe();
	}

	switchMock(mock: GraphQLMockDto) {
		this.facade.switchMock(mock);
	}
}
