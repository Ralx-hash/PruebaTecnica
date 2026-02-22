import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PerfilComponent } from './perfil.component';
import { SeguridadService } from '../../seguridad/seguridadService';
import { UsuarioPerfilDTO } from '../../../models/users';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


describe('PerfilComponent', () => {
  let component: PerfilComponent;           
  let fixture: ComponentFixture<PerfilComponent>; 
  let mockSeguridadService: jasmine.SpyObj<SeguridadService>; 


  beforeEach(async () => {

    const spy = jasmine.createSpyObj('SeguridadService', ['obtenerPerfil']);

    await TestBed.configureTestingModule({
      imports: [
        PerfilComponent,          
        MatCardModule,            
        MatIconModule
      ],
      providers: [
        provideHttpClient(),      
        provideHttpClientTesting(), 
        { provide: SeguridadService, useValue: spy } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    mockSeguridadService = TestBed.inject(SeguridadService) as jasmine.SpyObj<SeguridadService>;
  });


  it('debe crear el componente', () => {
    expect(component).toBeTruthy(); 
  });


  it('debe tener perfil como null inicialmente', () => {
    expect(component.perfil).toBeNull(); 
  });

  it('debe cargar el perfil del usuario correctamente', () => {
    const perfilMock: UsuarioPerfilDTO = {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      rol: 'admin',
      renta_mensual: 5000
    };


    mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilMock));


    component.ngOnInit();


    expect(mockSeguridadService.obtenerPerfil).toHaveBeenCalled(); 
    expect(component.perfil).toEqual(perfilMock); 
  });


  it('debe manejar errores al cargar el perfil', () => {
    const errorResponse = { status: 500, message: 'Server Error' };
    mockSeguridadService.obtenerPerfil.and.returnValue(throwError(() => errorResponse));
    
 
    spyOn(console, 'error');


    component.ngOnInit();


    expect(mockSeguridadService.obtenerPerfil).toHaveBeenCalled();
    expect(component.perfil).toBeNull(); 
    expect(console.error).toHaveBeenCalledWith('Error al obtener perfil', errorResponse);
  });


  it('debe mostrar información del perfil en el template', async () => {

    const perfilMock: UsuarioPerfilDTO = {
      id: 1,
      nombre: 'Ana Torres',
      email: 'ana@example.com',
      rol: 'supervisor',
      renta_mensual: 4500
    };

    mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilMock));


    component.ngOnInit();
    fixture.detectChanges(); 


    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ana@example.com');
  });

});
