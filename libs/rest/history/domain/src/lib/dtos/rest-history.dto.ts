import {RestHistoryItemDto} from './rest-history-item.dto';
import {RestHistoryPagingDto} from './rest-history-paging.dto';

export type RestHistoryDto = Readonly<{
	paging: RestHistoryPagingDto;
	items: ReadonlyArray<RestHistoryItemDto>;
}>;
