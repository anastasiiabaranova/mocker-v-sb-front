import {Action, createReducer, on} from '@ngrx/store';
import {RestState} from './rest.state';
import {restActions} from './rest.actions';

const initialState: RestState = {
	dialogLoading: false,
};

const restReducer = createReducer(
	initialState,
	on(restActions.setServices, (state, {services}) => ({
		...state,
		services,
	})),
	on(restActions.setCurrentService, (state, {service}) => ({
		...state,
		currentService: service,
	})),
	on(restActions.setMocks, (state, {mocks}) => ({
		...state,
		mocks,
	})),
	on(restActions.setModels, (state, {models}) => ({
		...state,
		models,
	})),
	on(restActions.createService, state => ({
		...state,
		dialogLoading: true,
	})),
	on(restActions.serviceCreated, (state, {service}) => ({
		...state,
		services: [service, ...(state.services || [])],
		dialogLoading: false,
	})),
	on(restActions.editService, state => ({
		...state,
		dialogLoading: true,
	})),
	on(restActions.serviceEdited, (state, {path, service}) => ({
		...state,
		services: state.services?.map(item =>
			item.path === path ? service : item
		),
		dialogLoading: false,
	})),
	on(restActions.proxySwitched, (state, {isProxyEnabled}) => ({
		...state,
		currentService: {
			...state.currentService!,
			isProxyEnabled,
		},
	})),
	on(restActions.historySwitched, (state, {isHistoryEnabled}) => ({
		...state,
		currentService: {
			...state.currentService!,
			isHistoryEnabled,
		},
	})),
	on(restActions.serviceDeleted, (state, {path}) => ({
		...state,
		services: state.services?.filter(
			({path: servicePath}) => servicePath !== path
		),
	})),
	on(restActions.createMock, state => ({
		...state,
		dialogLoading: true,
	})),
	on(restActions.mockCreated, state => ({
		...state,
		dialogLoading: false,
	})),
	on(restActions.editMock, state => ({
		...state,
		dialogLoading: true,
	})),
	on(restActions.mockEdited, state => ({
		...state,
		dialogLoading: false,
	})),
	on(restActions.createModel, state => ({
		...state,
		dialogLoading: true,
	})),
	on(restActions.modelCreated, state => ({
		...state,
		dialogLoading: false,
	})),
	on(restActions.editModel, state => ({
		...state,
		dialogLoading: true,
	})),
	on(restActions.modelEdited, state => ({
		...state,
		dialogLoading: false,
	})),
	on(restActions.modelDeleted, (state, {modelId}) => ({
		...state,
		models: state.models?.filter(({modelId: id}) => id !== modelId),
	})),
	on(restActions.allModelsDeleted, state => ({
		...state,
		models: [],
	})),
	on(restActions.mockDeleted, (state, {mockId}) => ({
		...state,
		mocks: state.mocks?.filter(({mockId: id}) => id !== mockId),
	})),
	on(restActions.allMocksDeleted, state => ({
		...state,
		mocks: [],
	})),
	on(restActions.dialogRequestFailure, state => ({
		...state,
		dialogLoading: false,
	})),
	on(restActions.resetState, () => initialState)
);

export function reducer(state: RestState | undefined, action: Action) {
	return restReducer(state, action);
}
