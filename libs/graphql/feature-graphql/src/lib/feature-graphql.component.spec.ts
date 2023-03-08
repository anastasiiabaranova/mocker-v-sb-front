import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeatureGraphQLComponent} from './feature-graphql.component';

describe('FeatureGraphQLComponent', () => {
	let component: FeatureGraphQLComponent;
	let fixture: ComponentFixture<FeatureGraphQLComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FeatureGraphQLComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FeatureGraphQLComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
