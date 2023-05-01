import {OperarionType, ValueType} from '../enums';

export type TriggerDto = Readonly<{
	id?: string;
	path: string;
	mockId: string;
	serviceId: string;
	operation: OperarionType;
	valueType: ValueType;
	value: string;
	enable: boolean;
}>;
