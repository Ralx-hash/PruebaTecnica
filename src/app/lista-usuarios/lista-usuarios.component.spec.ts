import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListaUsuariosComponent } from "./lista-usuarios.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { SeguridadService } from "../seguridad/seguridadService";
import { of } from "rxjs";


describe("ListaUsuariosComponent", () => {
    let component: ListaUsuariosComponent;
    let fixture: ComponentFixture<ListaUsuariosComponent>;
    let mockSeguridadService: jasmine.SpyObj<SeguridadService>;

    beforeEach(async () => {
        //se crea el mock del servicio de seguridad con los metodos que se usan en el componente
        const spy = jasmine.createSpyObj('SeguridadService', ['obtenerPerfil', 'obtenerUsuarios']);
        await TestBed.configureTestingModule({
            imports: [ListaUsuariosComponent],
            providers: [
                //provideHTTPCient y provideHttpClientTesting son necesarios para proveer el HttpClient en los tests
                //ya que el componente hace peticiones http a traves del servicio de seguridad
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: SeguridadService, useValue: spy }
            ]
        }).compileComponents();

        //esto crea el ambiente de pruebas del componente y del mock del servicio de seguridad
        fixture = TestBed.createComponent(ListaUsuariosComponent);
        component = fixture.componentInstance;
        mockSeguridadService = TestBed.inject(SeguridadService) as jasmine.SpyObj<SeguridadService>;
    });

    it("debe crear el componente", () => {
        expect(component).toBeTruthy();
    });

    it("verificadorUsuario debe ser verdadera para admin", () => {
        const perfilAdmin = { id: 1, nombre: "Admin", email: "admin@example.com", rol: "admin", renta_mensual: 3000 };
        const mockUsuarios = [
            { id: 1, nombre: "Usuario 1", email: "user1@test.com", rol: "usuario", renta_mensual: 2000 }
        ];   

        mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilAdmin));
        mockSeguridadService.obtenerUsuarios.and.returnValue(of(mockUsuarios)); 

        component.ngOnInit();
        
        expect(component.verificadorUsuario).toBeTrue();
        expect(component.listaUsuarios).toEqual(mockUsuarios);
    });

        it("verificadorUsuario debe ser falso para usuario", () => {
        // 📝 ARRANGE - Configurar AMBOS métodos que usa ngOnInit
        const perfilUsuario = { id: 2, nombre: "Usuario", email: "user@example.com", rol: "usuario", renta_mensual: 2000 };
        const mockUsuarios = [
            { id: 1, nombre: "Usuario 1", email: "user1@test.com", rol: "usuario", renta_mensual: 2000 }
        ];
        
        mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilUsuario));
        mockSeguridadService.obtenerUsuarios.and.returnValue(of(mockUsuarios));

        component.ngOnInit();
        
        expect(component.verificadorUsuario).toBeFalse();
        expect(component.listaUsuarios).toEqual(mockUsuarios);
    });

    it("debe cargar la lista de usuarios al inicializar", () => {
        const mockUsuarios = [
            { id: 1, nombre: "Usuario 1", email: "", rol: "admin", renta_mensual: 5000 },
            { id: 2, nombre: "Usuario 2", email: "", rol: "usuario", renta_mensual: 3000 }
        ];
        const perfilAdmin = { id: 1, nombre: "Admin", email: "admin@example.com", rol: "admin", renta_mensual: 3000 };

        mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilAdmin));
        mockSeguridadService.obtenerUsuarios.and.returnValue(of(mockUsuarios));

        component.ngOnInit();

        expect(component.listaUsuarios).toEqual(mockUsuarios);

    });

    it ("si el usuario es supervisor se debe cargar una lista solo de supervisores y usuarios" , () => {
        const mockUsuarios = [
            { id: 1, nombre: "Usuario 1", email: "", rol: "admin", renta_mensual: 5000 },
            { id: 2, nombre: "Usuario 2", email: "", rol: "usuario", renta_mensual: 3000 },
            { id: 3, nombre: "Usuario 3", email: "", rol: "supervisor", renta_mensual: 4000 }
        ];
        const perfilSupervisor = { id: 3, nombre: "Supervisor", email: "supervisor@example.com", rol: "supervisor", renta_mensual: 4000 };

        mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilSupervisor));
        mockSeguridadService.obtenerUsuarios.and.returnValue(of(mockUsuarios));

        component.ngOnInit();

        const usuariosVisibles = component.listaUsuarios.filter(u => u.rol === "usuario" || u.rol === "supervisor");
        expect(usuariosVisibles).toEqual([
            { id: 2, nombre: "Usuario 2", email: "", rol: "usuario", renta_mensual: 3000 },
            { id: 3, nombre: "Usuario 3", email: "", rol: "supervisor", renta_mensual: 4000 }
        ]);
    });

    it ("si el usuario es usuario se debe cargar una lista solo de el mismo" , () => {
        const mockUsuarios = [
            { id: 1, nombre: "Usuario 1", email: "", rol: "admin", renta_mensual: 5000 },
            { id: 2, nombre: "Usuario 2", email: "", rol: "usuario", renta_mensual: 3000 },
            { id: 3, nombre: "Usuario 3", email: "", rol: "supervisor", renta_mensual: 4000 }
        ];
        const perfilUsuario = { id: 2, nombre: "Usuario 2", email: "user2@example.com", rol: "usuario", renta_mensual: 3000 };

        mockSeguridadService.obtenerPerfil.and.returnValue(of(perfilUsuario));
        mockSeguridadService.obtenerUsuarios.and.returnValue(of(mockUsuarios));

        component.ngOnInit();

        const usuariosVisibles = component.listaUsuarios.filter(u => u.rol === "usuario");
        expect(usuariosVisibles).toEqual([
            { id: 2, nombre: "Usuario 2", email: "", rol: "usuario", renta_mensual: 3000 },
        ]);
    });



});