import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {fromGraphQL, graphQLActions} from '../store';
import {GraphQLMockDto, GraphQLServiceDto} from '../dtos';

@Injectable()
export class GraphQLFacade {
	readonly serviceId$ = this.store$.select(fromGraphQL.getServiceId);

	readonly services$ = this.store$.select(fromGraphQL.getServices);

	readonly currentService$ = this.store$.select(
		fromGraphQL.getCurrentService
	);

	readonly mocks$ = this.store$.select(fromGraphQL.getMocks);

	readonly serviceCreated$ = this.actions$.pipe(
		ofType(graphQLActions.serviceCreated)
	);

	readonly serviceEdited$ = this.actions$.pipe(
		ofType(graphQLActions.serviceEdited)
	);

	readonly mockCreated$ = this.actions$.pipe(
		ofType(graphQLActions.mockCreated)
	);

	readonly mockEdited$ = this.actions$.pipe(
		ofType(graphQLActions.mockEdited)
	);

	readonly dialogLoading$ = this.store$.select(fromGraphQL.getDialogLoading);

	constructor(
		private readonly store$: Store,
		private readonly actions$: Actions
	) {}

	loadServices(search?: string) {
		this.store$.dispatch(graphQLActions.loadServices({search}));
	}

	createService(service: GraphQLServiceDto) {
		this.store$.dispatch(graphQLActions.createService({service}));
	}

	editService(service: GraphQLServiceDto) {
		this.store$.dispatch(graphQLActions.editService({service}));
	}

	switchHistory(id: string, enable: boolean) {
		this.store$.dispatch(graphQLActions.switchHistory({id, enable}));
	}

	deleteService(id: string) {
		this.store$.dispatch(graphQLActions.deleteService({id}));
	}

	createMock(mock: GraphQLMockDto) {
		this.store$.dispatch(graphQLActions.createMock({mock}));
	}

	editMock(mock: GraphQLMockDto) {
		this.store$.dispatch(graphQLActions.editMock({mock}));
	}

	switchMock(mock: GraphQLMockDto) {
		this.store$.dispatch(graphQLActions.switchMock({mock}));
	}

	deleteMock(mock: GraphQLMockDto) {
		this.store$.dispatch(graphQLActions.deleteMock({mock}));
	}

	deleteAllMocks() {
		this.store$.dispatch(graphQLActions.deleteAllMocks());
	}
}
