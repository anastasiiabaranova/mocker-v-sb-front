import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {RestMockDto, RestModelDto, RestServiceDto} from '../dtos';
import {fromRest, restActions} from '../store';

@Injectable()
export class RestFacade {
	readonly services$ = this.store$.select(fromRest.getServices);

	readonly currentService$ = this.store$.select(fromRest.getCurrentService);

	readonly mocks$ = this.store$.select(fromRest.getMocks);

	readonly models$ = this.store$.select(fromRest.getModels);

	readonly serviceCreated$ = this.actions$.pipe(
		ofType(restActions.serviceCreated)
	);

	readonly serviceEdited$ = this.actions$.pipe(
		ofType(restActions.serviceEdited)
	);

	readonly modelCreated$ = this.actions$.pipe(
		ofType(restActions.modelCreated)
	);

	readonly mockCreated$ = this.actions$.pipe(ofType(restActions.mockCreated));

	readonly dialogLoading$ = this.store$.select(fromRest.getDialogLoading);

	constructor(
		private readonly store$: Store,
		private readonly actions$: Actions
	) {}

	loadServices(search?: string) {
		this.store$.dispatch(restActions.loadServices({search}));
	}

	createService(service: RestServiceDto) {
		this.store$.dispatch(restActions.createService({service}));
	}

	editService(path: string, service: RestServiceDto) {
		this.store$.dispatch(restActions.editService({path, service}));
	}

	deleteService(path: string) {
		this.store$.dispatch(restActions.deleteService({path}));
	}

	createMock(path: string, mock: RestMockDto) {
		this.store$.dispatch(restActions.createMock({path, mock}));
	}

	deleteMock(path: string, mockId: string) {
		this.store$.dispatch(restActions.deleteMock({path, mockId}));
	}

	createModel(path: string, model: RestModelDto) {
		this.store$.dispatch(restActions.createModel({path, model}));
	}

	deleteModel(path: string, modelId: string) {
		this.store$.dispatch(restActions.deleteModel({path, modelId}));
	}
}
