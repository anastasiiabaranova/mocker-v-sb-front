import {Action, createReducer, on} from '@ngrx/store';
import {GraphQLState} from './graphql.state';
import {graphQLActions} from './graphql.actions';
import {GraphQLServiceShortDto} from '../dtos';

const initialState: GraphQLState = {
	dialogLoading: false,
};

const graphQLReducer = createReducer(
	initialState,
	on(graphQLActions.setServices, (state, {services}) => ({
		...state,
		services,
	})),
	on(graphQLActions.setCurrentService, (state, {service}) => ({
		...state,
		currentService: service,
		mocks: service.mocks,
	})),
	on(graphQLActions.setMocks, (state, {mocks}) => ({
		...state,
		mocks,
	})),
	on(graphQLActions.createService, state => ({
		...state,
		dialogLoading: true,
	})),
	on(graphQLActions.serviceCreated, (state, {service}) => ({
		...state,
		services: [
			service as GraphQLServiceShortDto,
			...(state.services || []),
		],
		dialogLoading: false,
	})),
	on(graphQLActions.editService, state => ({
		...state,
		dialogLoading: true,
	})),
	on(graphQLActions.serviceEdited, (state, {service}) => ({
		...state,
		currentService: service,
		services: state.services?.map(item =>
			item.id === service.id ? (service as GraphQLServiceShortDto) : item
		),
		dialogLoading: false,
	})),
	on(graphQLActions.serviceDeleted, (state, {id}) => ({
		...state,
		services: state.services?.filter(({id: serviceId}) => serviceId !== id),
	})),
	on(graphQLActions.createMock, state => ({
		...state,
		dialogLoading: true,
	})),
	on(graphQLActions.mockCreated, (state, {mock}) => ({
		...state,
		mocks: [mock, ...(state.mocks || [])],
		dialogLoading: false,
	})),
	on(graphQLActions.mockDeleted, (state, {id}) => ({
		...state,
		mocks: state.mocks?.filter(({id: mockId}) => mockId !== id),
	})),
	on(graphQLActions.dialogRequestFailure, state => ({
		...state,
		dialogLoading: false,
	}))
);

export function reducer(state: GraphQLState | undefined, action: Action) {
	return graphQLReducer(state, action);
}
