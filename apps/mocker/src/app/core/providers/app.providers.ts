import {TUI_SANITIZER} from '@taiga-ui/core';
import {NgDompurifySanitizer} from '@tinkoff/ng-dompurify';

export const APP_PROVIDERS = [
	{
		provide: TUI_SANITIZER,
		useClass: NgDompurifySanitizer,
	},
];
