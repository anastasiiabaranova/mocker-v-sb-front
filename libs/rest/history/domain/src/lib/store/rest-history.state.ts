import {RestHistoryItemDto} from '../dtos';
import {RestSortingOrder} from '../enums';

export interface RestHistoryState {
	totalItems: number | null;
	totalPages: number | null;
	page: number;
	pageSize: number;
	from?: number;
	to?: number;
	search?: string;
	statusCodes?: string;
	responseSources?: string;
	requestMethods?: string;
	timeSort?: RestSortingOrder;
	items?: ReadonlyArray<RestHistoryItemDto> | null;
	loading: boolean;
}
