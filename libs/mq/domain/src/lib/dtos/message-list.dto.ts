import {Message} from './message.dto';

export type MessageList = Readonly<{
	messages: ReadonlyArray<Message>;
}>;
