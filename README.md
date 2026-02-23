<h1>Prueba Tecnica - README</h1>

<h2>Requisitos</h2>

<ul>
<li>Node.js: 18.x o superior</li>
<li>Angular: 19.0.0</li>
<li>Angular CLI: 19.0.0</li>
<li>Angular Material: 19.2.19</li>
<li>TypeScript: 5.6.2</li>
</ul>

<h2>Comandos</h2>
<p>Angular CLI</p>

```bash
npm install -g @angular/cli@19.0.0
```
<p>para correr el el cliente en desarrollo:</p>

```bash
ng serve -o
```

<h2>Descripción</h2>
<p>App web que consume de una API en Litestar - Funcion principal de mostrar una lista de usuarios que, dependiendo del rol
del usuario autenticado, mostrara la lista con mas o menos usuarios. Tambien es posible ver los datos del usuario autenticado
</p>

<h2>Funcionalidades principales</h2>

La base de datos se trabajo en PostgreSQL, con una sola tabla con los siguientes atributos:
<ul>
<li>id: Incremental/int</li>
<li>nombre: varchar(255)</li>
<li>rol: varchar(50)</li>
<li>renta_mensual: numeric(12, 5)</li>
<li>email: varchar(255) //Comentario: Esto es basicamente el nombre sin espacios, seguido de un "@gmail.com"</li> 
<li>normalized_email: varchar(255) //Comentario: Esto es el email pero totalemnte en mayusculas (util para validaciones)</li>
<li>hashed_password: varchar(255)</li>
</ul>

<p>Por temas de comodidad (y para hacer la insersion de los usuarios en la bd mas facil) campos que DEBERIAN ser Not Null no lo son, tales como rol, email, normalized_email y hashed_password (renta_mensual es por default 0)</p>

<h3>Login</h3>
<p>El login se trabaja mediante el modulo de forms de Angular Materials, pasa por una simple verificacion (required) y 
devuelve error si el usuario se autentico de forma incorrecta, en caso de que el usuario se haya identificado de forma correcta
el backend en Litestar enviara el token y su fecha de expiracion por el body, seguridadService se encarga de tratar esta informacion
Usuario: Nombre(sin espacios) + @gmail.com
Contraseña: Nombre(sin espacios) + @gmail.com
</p>

<h3>Lista</h3>
<p>Al entrar a lista-usuarios.component (que seria como el home del proyecto) se hacen algunas consultas a la bd por medio de seguridadService, siendo estas para obtener el perfil y la lista en si. Las validaciones de si el usuario puede consultar cierta informacion las hace el backend en Litestar, por lo tanto el metodo que recoge la lista solo tiene que encargarse de servir la informacion, no obstante hay un detalle. Si bien cuando el usuario tiene rol "usuario" la api envia una lista, esta solo viene con la informacion del usuario en cuestion y ni un registro mas, por lo cual es innecesario mostrar este registro.
Hay botones de filtro para mostrar todos los registros, o solo admins, o solo supervisores o solo usuarios. (disponible solo para admins y supervisores)
Tambien hay un form para buscar a un usuario por nombre (esto se logra suscribiendonos a los cambios del form al iniciar el componente).
</p>
<p> 
El booleano verificadorUsuario y la condicional en la plantilla controlan este tema. Ahora bien, para que a los roles "usuario" se les muestre algo y no solo la pantalla en blanco, hay programado que un dialogo se abra con un boton. Dialog de Angular Material es parecido a lo que vendria siendo un modal. Dentro de este "modal" esta la informacion del usuario para todos los roles de usuario, esta informacion cuenta con el correo, nombre, rol y renta mensual
</p>

<h3>Guard, interceptor-auth, y barra superior</h3>
<p> 
Angular tiene una forma de tratar con el ruteo a lo que deberian ser rutas protegidas. Esto es por medio de guard, esta cuenta con un metodo simple que injecta seguridadService para consultar el token actual.
Interceptor-auth es otro metodo que tiene que ver con la autentificacion, es el metodo encargado de enviar el token devuelta a a la API por medio del header de la respuesta. Y por ultimo el componente de barra superior, este importa autorizarComponent para verficar si el usuario puede ver ciertas adiciones de la barra, como por ejemplo, un usuario deslogeado no sera capaz de ver ni el boton de logout ni el email (porque no habria email que consultar en primera).
</p> 

<h3>Tests</h3>
<p>Lo tests en Angular prueba de la siguiente forma:</p> 

```bash
ng test
```
<p>Ahora mismo se cuenta con tests en los componentes de lista-usuarios, funciones de compartidos y perfil de compartidos. La mayoria de los test revisa si los datos son recibidos de manera correcta y en perfil hay un solo test que contempla cambios en plantilla</p> 
