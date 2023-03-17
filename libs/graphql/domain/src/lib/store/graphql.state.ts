import {
	GraphQLMockDto,
	GraphQLServiceDto,
	GraphQLServiceShortDto,
} from '../dtos';

export interface GraphQLState {
	services?: ReadonlyArray<GraphQLServiceShortDto> | null;
	currentService?: GraphQLServiceDto | null;
	mocks?: ReadonlyArray<GraphQLMockDto> | null;
	dialogLoading: boolean;
}
