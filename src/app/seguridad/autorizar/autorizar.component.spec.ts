import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AutorizarComponent } from './autorizar.component';

describe('AutorizarComponent', () => {
  let component: AutorizarComponent;
  let fixture: ComponentFixture<AutorizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorizarComponent],
      providers: [
        provideHttpClient(),      // ← Nueva API para HttpClient (Angular 17+)
        provideHttpClientTesting() // ← Nueva API para testing (Angular 17+)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
