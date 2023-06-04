# proyecto2
Proyecto Final Curso Cifo (segunda prueba aplicando bootstrap)


problemas a solucionar:
1-no manda mensaje al ususario si algun dato del form delegado ya existe, pero sí sale la pantalla de insercion, arreglar los dos
2-al insertar un equipo, necesito que la insercion sql lea el id de delegado para insertarlo en el ultimo campo en vez del que tenia por defecto, ya he hecho un preboceto pero necesito probarlo cuando pueda solucionar los otros problemas y los forms funcionen
3-cuando hago un login o cierro el login, el navegador me lleva a la ruta login o cierre, y necesito que me deje en la ruta actual: localhost:3000/actualidad, si logueo se convierte en localhost:3000/login y es una pagina en blanco con un mensaje de exito o error, he probado el location.reload() pero no me funcionaba
4-ocultar el formulario equipo cuando detecte que el usuario logueado ya tiene un delegado_iddelegado y que salte el formulario de jugadores.
5- diferentes problemas en consola del navegador, y ocultar errores de las cosas que no se cargan porque segun si estas logueado o no encuentra unos forms o otros