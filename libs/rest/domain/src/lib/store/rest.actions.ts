import {createAction, props} from '@ngrx/store';
import {RestServiceDto, RestServiceShortDto} from '../dtos';

const loadServices = createAction(
	'[REST] Load Services',
	props<{search?: string}>()
);
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
const createService = createAction(
	'[REST] Create Service',
	props<{service: RestServiceDto}>()
);
const serviceCreated = createAction(
	'[REST] Service Created',
	props<{service: RestServiceDto}>()
);

export const restActions = {
	loadServices,
	setServices,
	openService,
	setCurrentService,
	createService,
	serviceCreated,
};
