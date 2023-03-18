import {
	ChangeDetectionStrategy,
	Component,
	Injector,
	OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {MQFacade, TopicShort} from '@mocker/mq/domain';
import {TuiDialogService} from '@taiga-ui/core';

@Component({
	selector: 'mocker-feature-mq-topic-list',
	templateUrl: './feature-mq-topic-list.component.html',
	styleUrls: ['./feature-mq-topic-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMqTopicListComponent implements OnInit {
	readonly topics$ = this.facade.topics$;
	readonly selectedTopic$ = this.facade.selectedTopic$;

	readonly isSameTopic = (a: TopicShort, b: TopicShort) =>
		a.brokerType === b.brokerType && a.topicName === b.topicName;

	constructor(
		private readonly facade: MQFacade,
		private readonly router: Router,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector
	) {}

	ngOnInit(): void {
		this.facade.loadTopics();
	}

	openTopic(topic: TopicShort) {
		this.router.navigate(['mq'], {queryParams: topic});
	}

	createTopic() {
		// this.dialogService
		// 	.open(
		// 		new PolymorpheusComponent(
		// 			CreateServiceDialogComponent,
		// 			this.injector
		// 		)
		// 	)
		// 	.subscribe();
	}

	searchTopics(search: string | null) {
		this.facade.loadTopics(undefined, search || '');
	}
}