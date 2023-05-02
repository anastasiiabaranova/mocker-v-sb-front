import {createAction, props} from '@ngrx/store';
import {
	RestMockDto,
	RestMockShortDto,
	RestModelDto,
	RestModelShortDto,
	RestServiceDto,
	RestServiceShortDto,
} from '../dtos';

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
	props<{service: RestServiceDto}>()
);
const updateMocks = createAction(
	'[REST] Update Mocks',
	props<{path: string}>()
);
const updateModels = createAction(
	'[REST] Update Models',
	props<{path: string}>()
);
const setMocks = createAction(
	'[REST] Set Mocks',
	props<{mocks: ReadonlyArray<RestMockShortDto>}>()
);
const setModels = createAction(
	'[REST] Set Models',
	props<{models: ReadonlyArray<RestModelShortDto>}>()
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
const switchProxy = createAction(
	'[REST] Switch Proxy',
	props<{path: string; isProxyEnabled: boolean}>()
);
const proxySwitched = createAction(
	'[REST] Proxy Switched',
	props<{isProxyEnabled: boolean}>()
);
const switchHistory = createAction(
	'[REST] Switch History',
	props<{path: string; isHistoryEnabled: boolean}>()
);
const historySwitched = createAction(
	'[REST] History Switched',
	props<{isHistoryEnabled: boolean}>()
);
const deleteService = createAction(
	'[REST] Delete Service',
	props<{path: string}>()
);
const serviceDeleted = createAction(
	'[REST] Service Deleted',
	props<{path: string}>()
);
const createMock = createAction(
	'[REST] Create Mock',
	props<{path: string; mock: RestMockDto}>()
);
const mockCreated = createAction(
	'[REST] Mock Created',
	props<{path: string; mock: RestMockDto}>()
);
const editMock = createAction(
	'[REST] Edit Mock',
	props<{path: string; mock: Partial<RestMockDto>}>()
);
const mockEdited = createAction(
	'[REST] Mock Edited',
	props<{path: string; mock: Partial<RestMockDto>}>()
);
const deleteMock = createAction(
	'[REST] Delete Mock',
	props<{path: string; mockId: string}>()
);
const mockDeleted = createAction(
	'[REST] Mock Deleted',
	props<{mockId: string}>()
);
const deleteAllMocks = createAction(
	'[REST] Delete All Mocks',
	props<{path: string}>()
);
const allMocksDeleted = createAction('[REST] All Mocks Deleted');
const createModel = createAction(
	'[REST] Create Model',
	props<{path: string; model: RestModelDto}>()
);
const modelCreated = createAction(
	'[REST] Model Created',
	props<{path: string; model: RestModelDto}>()
);
const editModel = createAction(
	'[REST] Edit Model',
	props<{path: string; model: RestModelDto}>()
);
const modelEdited = createAction(
	'[REST] Model Edited',
	props<{path: string; model: RestModelDto}>()
);
const deleteModel = createAction(
	'[REST] Delete Model',
	props<{path: string; modelId: string}>()
);
const modelDeleted = createAction(
	'[REST] Model Deleted',
	props<{modelId: string}>()
);
const deleteAllModels = createAction(
	'[REST] Delete All Models',
	props<{path: string}>()
);
const allModelsDeleted = createAction('[REST] All Models Deleted');
const dialogRequestFailure = createAction('[REST] Dialog Request Failure');

export const restActions = {
	loadServices,
	setServices,
	setCurrentService,
	updateMocks,
	updateModels,
	setMocks,
	setModels,
	createService,
	serviceCreated,
	editService,
	serviceEdited,
	switchProxy,
	proxySwitched,
	switchHistory,
	historySwitched,
	deleteService,
	serviceDeleted,
	createMock,
	mockCreated,
	editMock,
	mockEdited,
	deleteMock,
	mockDeleted,
	deleteAllModels,
	allModelsDeleted,
	deleteAllMocks,
	allMocksDeleted,
	createModel,
	modelCreated,
	editModel,
	modelEdited,
	deleteModel,
	modelDeleted,
	dialogRequestFailure,
};
