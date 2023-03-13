import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromRest, restActions} from '../store';

@Injectable()
export class RestFacade {
	readonly services$ = this.store$.select(fromRest.getServices);
	readonly currentService$ = this.store$.select(fromRest.getCurrentService);

	constructor(private readonly store$: Store) {}

	loadServices() {
		console.log('here');
		this.store$.dispatch(restActions.loadServices());
	}
}
