import {RestServiceDto, RestServiceShortDto} from '../dtos';

export interface RestState {
	services?: ReadonlyArray<RestServiceShortDto> | null;
	currentService?: RestServiceDto | null;
	serviceInProgress: boolean;
}
