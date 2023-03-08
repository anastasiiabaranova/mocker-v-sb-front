import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeatureGraphqlServiceComponent} from './feature-graphql-service.component';

describe('FeatureGraphqlServiceComponent', () => {
	let component: FeatureGraphqlServiceComponent;
	let fixture: ComponentFixture<FeatureGraphqlServiceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FeatureGraphqlServiceComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FeatureGraphqlServiceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
