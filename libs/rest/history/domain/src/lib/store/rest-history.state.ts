import {RestHistoryItemDto} from '../dtos';

export interface RestHistoryState {
	totalItems: number | null;
	totalPages: number | null;
	page: number;
	pageSize: number;
	from?: number;
	to?: number;
	search?: string;
	items?: ReadonlyArray<RestHistoryItemDto> | null;
	loading: boolean;
}
