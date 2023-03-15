import {
	RestMockShortDto,
	RestModelShortDto,
	RestServiceDto,
	RestServiceShortDto,
} from '../dtos';

export interface RestState {
	services?: ReadonlyArray<RestServiceShortDto> | null;
	currentService?: RestServiceDto | null;
	mocks?: ReadonlyArray<RestMockShortDto> | null;
	models?: ReadonlyArray<RestModelShortDto> | null;
	dialogLoading: boolean;
}
