import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceptaTargetaComponent } from './recepta-targeta.component';

describe('ReceptaTargeta', () => {
  let component: ReceptaTargetaComponent;
  let fixture: ComponentFixture<ReceptaTargetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptaTargetaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceptaTargetaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
