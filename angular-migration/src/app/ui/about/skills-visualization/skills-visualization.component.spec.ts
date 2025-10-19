import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsVisualizationComponent } from './skills-visualization.component';

describe('SkillsVisualizationComponent', () => {
  let component: SkillsVisualizationComponent;
  let fixture: ComponentFixture<SkillsVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsVisualizationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 skill nodes', () => {
    expect(component['skills']().length).toBe(6);
  });
});
