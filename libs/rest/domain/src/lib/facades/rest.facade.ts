import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {RestServiceDto} from '../dtos';
import {fromRest, restActions} from '../store';

@Injectable()
export class RestFacade {
	readonly services$ = this.store$.select(fromRest.getServices);
	readonly currentService$ = this.store$.select(fromRest.getCurrentService);

	constructor(private readonly store$: Store) {}

	loadServices(search?: string) {
		this.store$.dispatch(restActions.loadServices({search}));
	}

	openServices(path: string) {
		this.store$.dispatch(restActions.openService({path}));
	}

	createService(service: RestServiceDto) {
		this.store$.dispatch(restActions.createService({service}));
	}
}
