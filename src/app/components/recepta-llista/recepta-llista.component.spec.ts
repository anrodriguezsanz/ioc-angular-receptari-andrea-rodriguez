import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceptaLlistaComponent } from './recepta-llista.component';

describe('ReceptaLlista', () => {
  let component: ReceptaLlistaComponent;
  let fixture: ComponentFixture<ReceptaLlistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptaLlistaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceptaLlistaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
