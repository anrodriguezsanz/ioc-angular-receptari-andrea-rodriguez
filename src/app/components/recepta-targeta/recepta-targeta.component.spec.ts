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
    fixture.componentRef.setInput('recepta', {
      id: 1,
      titol: 'Truita de patates',
      descripcio: 'Recepta tradicional',
      categoria: 'Sopar',
      dataCreacio: new Date('2026-11-01'),
      tempsPreparacio: 30,
      destacada: true,
      ingredients: ['Ous', 'Patates'],
      passes: ['Fregir patates', 'Quallar la truita']
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
