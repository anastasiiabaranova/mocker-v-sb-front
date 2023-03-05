import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FeatureRestComponent} from './feature-rest.component';

describe('FeatureRestComponent', () => {
	let component: FeatureRestComponent;
	let fixture: ComponentFixture<FeatureRestComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FeatureRestComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FeatureRestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
