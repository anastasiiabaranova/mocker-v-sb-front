import {createAction, props} from '@ngrx/store';
import {RestServiceDto, RestServiceShortDto} from '../dtos';

const loadServices = createAction('[REST] Load Services');
const setServices = createAction(
	'[REST] Set Services',
	props<{services: ReadonlyArray<RestServiceShortDto> | null}>()
);
const openService = createAction(
	'[REST] Open Service',
	props<{path: string}>()
);
const setCurrentService = createAction(
	'[REST] Open Service',
	props<{service: RestServiceDto | null}>()
);

export const restActions = {
	loadServices,
	setServices,
	openService,
	setCurrentService,
};
