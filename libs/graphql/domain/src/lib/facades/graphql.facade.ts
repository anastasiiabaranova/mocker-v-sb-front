import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {fromGraphQL, graphQLActions} from '../store';
import {GraphQLMockDto, GraphQLServiceDto} from '../dtos';

@Injectable()
export class RestFacade {
	readonly servicePath$ = this.store$.select(fromGraphQL.getServiceId);

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

	deleteService(id: string) {
		this.store$.dispatch(graphQLActions.deleteService({id}));
	}

	createMock(mock: GraphQLMockDto) {
		this.store$.dispatch(graphQLActions.createMock({mock}));
	}

	deleteMock(id: string) {
		this.store$.dispatch(graphQLActions.deleteMock({id}));
	}
}
