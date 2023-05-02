import {OperarionType} from '../enums';

export type TriggerDto = Readonly<{
	id?: string;
	mockId: string;
	path: string;
	operation: OperarionType;
	value: string;
	enable: boolean;
}>;
