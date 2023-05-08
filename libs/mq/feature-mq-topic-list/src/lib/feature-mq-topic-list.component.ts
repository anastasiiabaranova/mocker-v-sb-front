import {
	ChangeDetectionStrategy,
	Component,
	Injector,
	OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {MQFacade, TopicShort} from '@mocker/mq/domain';
import {CreateTopicDialogComponent} from '@mocker/shared/ui';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {takeUntil} from 'rxjs';

@Component({
	selector: 'mocker-feature-mq-topic-list',
	templateUrl: './feature-mq-topic-list.component.html',
	styleUrls: ['./feature-mq-topic-list.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TuiDestroyService],
})
export class FeatureMqTopicListComponent implements OnInit {
	readonly topics$ = this.facade.topics$;
	readonly selectedTopic$ = this.facade.selectedTopic$;

	readonly skeletons = Array(20);

	readonly isSameTopic = (a: TopicShort, b: TopicShort) =>
		a && b && a.brokerType === b.brokerType && a.topicName === b.topicName;

	constructor(
		private readonly facade: MQFacade,
		private readonly router: Router,
		private readonly dialogService: TuiDialogService,
		private readonly injector: Injector,
		private readonly destroy$: TuiDestroyService
	) {}

	ngOnInit(): void {
		this.facade.loadTopics();
	}

	openTopic(topic: TopicShort) {
		this.router.navigate(['mq/topic'], {queryParams: topic});
	}

	createTopic() {
		this.dialogService
			.open(
				new PolymorpheusComponent(
					CreateTopicDialogComponent,
					this.injector
				),
				{size: 's'}
			)
			.pipe(takeUntil(this.destroy$))
			.subscribe();
	}

	searchTopics(search: string | null) {
		this.facade.loadTopics(undefined, search || '');
	}
}
