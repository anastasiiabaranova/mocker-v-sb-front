import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {RestServiceDto} from '../dtos';
import {fromRest, restActions} from '../store';

@Injectable()
export class RestFacade {
	readonly services$ = this.store$.select(fromRest.getServices);

	readonly currentService$ = this.store$.select(fromRest.getCurrentService);

	readonly serviceCreated$ = this.actions$.pipe(
		ofType(restActions.serviceCreated)
	);

	readonly serviceEdited$ = this.actions$.pipe(
		ofType(restActions.serviceEdited)
	);

	readonly serviceInProgress$ = this.store$.select(
		fromRest.getServiceInProgress
	);

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
}
