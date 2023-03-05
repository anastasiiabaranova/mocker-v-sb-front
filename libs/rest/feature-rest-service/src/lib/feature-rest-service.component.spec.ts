import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeatureRestServiceComponent} from './feature-rest-service.component';

describe('FeatureRestServiceComponent', () => {
	let component: FeatureRestServiceComponent;
	let fixture: ComponentFixture<FeatureRestServiceComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FeatureRestServiceComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FeatureRestServiceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
