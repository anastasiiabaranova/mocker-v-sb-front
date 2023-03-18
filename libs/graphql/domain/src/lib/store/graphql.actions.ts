import {createAction, props} from '@ngrx/store';
import {
	GraphQLMockDto,
	GraphQLServiceDto,
	GraphQLServiceShortDto,
} from '../dtos';

const loadServices = createAction(
	'[GRAPHQL] Load Services',
	props<{search?: string}>()
);
const setServices = createAction(
	'[GRAPHQL] Set Services',
	props<{services: ReadonlyArray<GraphQLServiceShortDto> | null}>()
);
const setCurrentService = createAction(
	'[GRAPHQL] Set Current Service',
	props<{service: GraphQLServiceDto}>()
);
const setMocks = createAction(
	'[GRAPHQL] Set Mocks',
	props<{mocks: ReadonlyArray<GraphQLMockDto>}>()
);
const createService = createAction(
	'[GRAPHQL] Create Service',
	props<{service: GraphQLServiceDto}>()
);
const serviceCreated = createAction(
	'[GRAPHQL] Service Created',
	props<{service: GraphQLServiceDto}>()
);
const editService = createAction(
	'[GRAPHQL] Edit Service',
	props<{service: GraphQLServiceDto}>()
);
const serviceEdited = createAction(
	'[GRAPHQL] Service Edited',
	props<{service: GraphQLServiceDto}>()
);
const deleteService = createAction(
	'[GRAPHQL] Delete Service',
	props<{id: string}>()
);
const serviceDeleted = createAction(
	'[GRAPHQL] Service Deleted',
	props<{id: string}>()
);
const createMock = createAction(
	'[GRAPHQL] Create Mock',
	props<{mock: GraphQLMockDto}>()
);
const mockCreated = createAction(
	'[GRAPHQL] Mock Created',
	props<{mock: GraphQLMockDto}>()
);
const deleteMock = createAction(
	'[GRAPHQL] Delete Mock',
	props<{mock: GraphQLMockDto}>()
);
const mockDeleted = createAction(
	'[GRAPHQL] Mock Deleted',
	props<{mock: GraphQLMockDto}>()
);
const dialogRequestFailure = createAction('[GRAPHQL] Dialog Request Failure');

export const graphQLActions = {
	loadServices,
	setServices,
	setCurrentService,
	setMocks,
	createService,
	serviceCreated,
	editService,
	serviceEdited,
	deleteService,
	serviceDeleted,
	createMock,
	mockCreated,
	deleteMock,
	mockDeleted,
	dialogRequestFailure,
};
