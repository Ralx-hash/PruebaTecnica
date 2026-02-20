import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { PerfilComponent } from './perfil.component';
import { SeguridadService } from '../../seguridad/seguridadService';
import { UsuarioPerfilDTO } from '../../../models/users';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

// 🧪 BLOQUE 1: DESCRIPCIÓN DEL COMPONENTE
describe('PerfilComponent', () => {
  let component: PerfilComponent;           // ← El componente que vamos a testear
  let fixture: ComponentFixture<PerfilComponent>; // ← Contenedor del componente
  let mockSeguridadService: jasmine.SpyObj<SeguridadService>; // ← Mock del servicio

  // 🔧 BLOQUE 2: CONFIGURACIÓN ANTES DE CADA TEST
  beforeEach(async () => {
    // Crear un MOCK (versión falsa) del SeguridadService
    const spy = jasmine.createSpyObj('SeguridadService', ['obtenerPerfil']);

    await TestBed.configureTestingModule({
      imports: [
        PerfilComponent,          // ← Nuestro componente standalone
        MatCardModule,            // ← Dependencias necesarias
        MatIconModule
      ],
      providers: [
        provideHttpClient(),      // ← Nueva API para HttpClient
        provideHttpClientTesting(), // ← Nueva API para testing
        { provide: SeguridadService, useValue: spy } // ← Usar mock en lugar del servicio real
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    mockSeguridadService = TestBed.inject(SeguridadService) as jasmine.SpyObj<SeguridadService>;
  });

  // 🧩 TEST 1: VERIFICAR QUE EL COMPONENTE SE CREA
  it('debe crear el componente', () => {
    expect(component).toBeTruthy(); // ← Verifica que el componente existe
  });

  // 🧩 TEST 2: VERIFICAR VALORES INICIALES
  it('debe tener perfil como null inicialmente', () => {
    expect(component.perfil).toBeNull(); // ← Verifica valor inicial
  });

  // 🧩 TEST 3: VERIFICAR CARGA EXITOSA DE PERFIL
  it('debe cargar el perfil del usuario correctamente', () => {
    // 📝 ARRANGE (Preparar datos)
    const perfilMock: UsuarioPerfilDTO = {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      rol: 'admin',
      renta_mensual: 5000
    };

    // Configurar qué debe retornar el mock cuando se llame a obtenerPerfil()
    mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilMock));

    // 🎬 ACT (Ejecutar acción)
    component.ngOnInit();

    // ✅ ASSERT (Verificar resultado)
    expect(mockSeguridadService.obtenerPerfil).toHaveBeenCalled(); // ← Se llamó al servicio
    expect(component.perfil).toEqual(perfilMock); // ← Se guardó el perfil
  });

  // 🧩 TEST 4: VERIFICAR MANEJO DE ERRORES
  it('debe manejar errores al cargar el perfil', () => {
    // 📝 ARRANGE (Preparar error)
    const errorResponse = { status: 500, message: 'Server Error' };
    mockSeguridadService.obtenerPerfil.and.returnValue(throwError(() => errorResponse));
    
    // Espiar console.error para verificar que se llame
    spyOn(console, 'error');

    // 🎬 ACT (Ejecutar acción)
    component.ngOnInit();

    // ✅ ASSERT (Verificar resultado)
    expect(mockSeguridadService.obtenerPerfil).toHaveBeenCalled();
    expect(component.perfil).toBeNull(); // ← Perfil sigue siendo null
    expect(console.error).toHaveBeenCalledWith('Error al obtener perfil', errorResponse);
  });

  // 🧩 TEST 5: VERIFICAR RENDERIZADO EN EL DOM
  it('debe mostrar información del perfil en el template', async () => {
    // 📝 ARRANGE (Preparar datos)
    const perfilMock: UsuarioPerfilDTO = {
      id: 1,
      nombre: 'Ana Torres',
      email: 'ana@example.com',
      rol: 'supervisor',
      renta_mensual: 4500
    };

    mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilMock));

    // 🎬 ACT (Ejecutar y actualizar vista)
    component.ngOnInit();
    fixture.detectChanges(); // ← Actualizar el DOM

    // ✅ ASSERT (Verificar que aparece en el HTML)
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ana@example.com');
  });

  // 🧩 TEST 6: VERIFICAR INYECCIÓN DE DEPENDENCIAS
  it('debe inyectar SeguridadService correctamente', () => {
    expect(component.seguridadService).toBeTruthy();
    expect(component.seguridadService).toBe(mockSeguridadService);
  });
});
