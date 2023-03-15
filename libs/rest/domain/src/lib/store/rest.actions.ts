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
const editService = createAction(
	'[REST] Edit Service',
	props<{path: string; service: RestServiceDto}>()
);
const serviceEdited = createAction(
	'[REST] Service Edited',
	props<{path: string; service: RestServiceDto}>()
);
const deleteService = createAction(
	'[REST] Delete Service',
	props<{path: string}>()
);
const serviceDeleted = createAction(
	'[REST] Service Deleted',
	props<{path: string}>()
);
const serviceRequestFailure = createAction('[REST] Service Request Failure');

export const restActions = {
	loadServices,
	setServices,
	setCurrentService,
	createService,
	serviceCreated,
	editService,
	serviceEdited,
	deleteService,
	serviceDeleted,
	serviceRequestFailure,
};
