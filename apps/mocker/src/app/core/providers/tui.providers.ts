import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n';
import {of} from 'rxjs';

export const TUI_PROVIDERS = [
	{
		provide: TUI_LANGUAGE,
		useValue: of(TUI_RUSSIAN_LANGUAGE),
	},
];
