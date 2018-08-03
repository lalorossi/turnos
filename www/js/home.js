//Crea los datos y establece lo necesario para empezar a trabajar
//Dejar siempre al final para que tenga ya declaradas todas las funciones
function onLoad(){
	crearVariables();
	iniciarPagina();
	mostrarEstado();
}


//Esconder el dropdown si se clickea afuera
window.onclick = function(event) {
    if (!event.target.matches('.botonDropdown')) {
        var dropdowns = document.getElementsByClassName("dropdownContent");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }	
}


//Crea todas las variables necesarias para empezar a trabajar
function crearVariables(){
	//Clase para la logica de las personas con metodos para turnos
	class Persona{
		constructor(nombreIng, color, letra){
			this.nombre = nombreIng;
			//Colores que representan al usuario por UI
			this.colorFondo = color;
			this.colorLetra = letra;
			//Array de la siguiente persona que tiene que hacer su turno
			this.siguienteRealizador = [this];
		}
		hiceElTurnoDe(alguien){
			//Si no hice mi propio turno
			if(alguien != this){
				//Si quien hizo mi turno no me lo "debía"
				if(alguien.quienHaceMiTurno() != this){	
					this.siguienteRealizador.unshift(alguien.quienHaceMiTurno());
					if(alguien != alguien.quienHaceMiTurno()){
						alguien.siguienteRealizador.shift(alguien.siguienteRealizador[0]);
					}
				}
				else{
					alguien.siguienteRealizador.shift(alguien.siguienteRealizador[0]);
					//window.alert("debia");
				}
			}
		}
		hizoMiTurno(alguien){

		}
		quienHaceMiTurno(){
			return this.siguienteRealizador[0];
		}
	}

	class Turnos{
		constructor(jj, gg, ss){
			this.posiciones = [jj, gg, ss];
		}
		getPosicion(){
			return this.posiciones[0];
		}
		aQuienLeToca(){
			return this.posiciones[0].quienHaceMiTurno();
		}
		hacerTurno(alguien){
			alguien.hiceElTurnoDe(this.posiciones[0]);
			//window.alert(alguien.nombre + " hace el turno de " + this.posiciones[0].nombre);
			this.posiciones[0].quienHaceMiTurno().hizoMiTurno(alguien);
			var aux = this.posiciones[0];
			this.posiciones[0] = this.posiciones[1];
			this.posiciones[1] = this.posiciones[2];
			this.posiciones[2] = aux;
			mostrarEstado();
		}
	}

	//Los 3 objetos de trabajo
	personaJuli= new Persona("Juli", "purple", "white");
	personaGuady= new Persona("Guady", "orange", "black");
	personaSebi= new Persona("Sebi", "green", "white");

	//Array de todos los usuarios
	arrayPersonas = [];
	arrayPersonas.push(personaJuli);
	arrayPersonas.push(personaGuady);
	arrayPersonas.push(personaSebi);

	//Objeto unico para controlar las posiciones de los turnos
	turnos = new Turnos(personaJuli, personaGuady, personaSebi);
}


function iniciarPagina(){
	establecerUsuarioActual();
	//Cambia el color de la barra header
	//Tambien podria ser que cambie el color de la barra de estado
	var barraHeader = document.getElementsByClassName("barraHeader")[0];
	barraHeader.style = "background-color: " + usuarioActual.colorFondo;
	barraHeader.style.color = usuarioActual.colorLetra;

	//Cambia el nombre de usuario en el header del menu lateral
	var tituloHeader = document.getElementsByClassName("tituloHeader")[0];
	tituloHeader.innerHTML = usuarioActual.nombre;

	// SqlServer.init("den1.mysql5.gear.host", "SQLEXPRESS", "appturnos", "Ma3R8882~Y?O	", "appturnos", function(event) {
	//   window.alert(JSON.stringify(event));
	// }, function(error) {
	//   window.alert(JSON.stringify(error));
	// });
}


function establecerUsuarioActual(){
	//Accede a los datos del GET del form login
	parametrosGet = parseURLParams(window.location.href);
		/*
		Devuelve algo con el formato
		Object{
			inpuser = "Guady",
			inppas = "Jaima"
		}
		*/

	//Para determinar el usuario que logueo comparo los nombres de cada persona con los datos de GET
	arrayPersonas.forEach(function(persona){
		if(persona.nombre == parametrosGet.inpuser)
			usuarioActual = persona;
	});
}


//Funcion para acceder a los datos del get
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}


//Muestra en pantalla el estado de los objetos de personas
function mostrarEstado(){
	contenedorJ = document.getElementById("estadoJ");
	contenedorJ.innerHTML = "JULI";
	contenedorJ.innerHTML += "<br/>";
	contenedorJ.innerHTML += "Siguientes realizadores: ";

	var i = 0;
	while(personaJuli.siguienteRealizador[i] != null){
		contenedorJ.innerHTML += personaJuli.siguienteRealizador[i].nombre;
		i++;	
	}

	contenedorJ.innerHTML += "<br/>";
	contenedorJ.innerHTML += "<br/>";


	contenedorG = document.getElementById("estadoG");
	contenedorG.innerHTML = "GUADY";
	contenedorG.innerHTML += "<br/>";
	contenedorG.innerHTML += "Siguientes realizadores: ";

	var i = 0;
	while(personaGuady.siguienteRealizador[i] != null){
		contenedorG.innerHTML += personaGuady.siguienteRealizador[i].nombre;
		i++;	
	}

	contenedorG.innerHTML += "<br/>";
	contenedorG.innerHTML += "<br/>";


	contenedorS = document.getElementById("estadoS");
	contenedorS.innerHTML = "SEBI";
	contenedorS.innerHTML += "<br/>";
	contenedorS.innerHTML += "Siguientes realizadores: ";

	var i = 0;
	while(personaSebi.siguienteRealizador[i] != null){
		contenedorS.innerHTML += personaSebi.siguienteRealizador[i].nombre;
		i++;	
	}

	contenedorS.innerHTML += "<br/>";
	contenedorS.innerHTML += "<br/>";

	contenedorSiguienteTurno = document.getElementById("siguienteTurno");
	contenedorSiguienteTurno.innerHTML = ("Le toca a: " + turnos.aQuienLeToca().nombre + " en el turno de: " + turnos.getPosicion().nombre);
}


//Para pruebas: Indica que Juli hace un turno
function clickHacerTurnoJ(){
	turnos.hacerTurno(personaJuli);	
}


//Para pruebas: Indica que Guady hace un turno
function clickHacerTurnoG(){
	turnos.hacerTurno(personaGuady);
}


//Para pruebas: Indica que Sebi hace un turno
function clickHacerTurnoS(){
	turnos.hacerTurno(personaSebi);
}


//Muestra el contenido del dropdown
function dropdown() {
        document.getElementById("dropdownOpciones").classList.toggle("show");
}

//Cierra la sesion del usuario actual
function cerrarSesion(){
	//Borra el estado de los objetos y la página actual
	location.reload(true);

	//Vuelve a la página de inicion de sesión
	location.replace("login.html");
}

//Cambia la página a la vista de opciones de usuario
function mostrarVistaOpcionesDeUsuario() {
	activarVista("vistaOpcionesDeUsuario");
}

//Cambia la página a vista inicial
function mostrarVistaInicial(){
	activarVista("vistaInicial");
}

//Cambia el contenido a la página con id indicada
function activarVista(idVistaNueva) {
	//Por defecto, las vistas de paginas estan escondidas. La clase vistaActiva sobreescribe la visibilidad
	//La clase "vistaActiva" solo lal debe tener el elemento de vista que se esté mostrando al momento
	//Busca las vistas a mostrar y la vista actual
	var vistaActiva = document.getElementsByClassName("vistaActiva")[0];
	var vistaNueva = document.getElementById(idVistaNueva);

	//Cambia las clases para mostrar la nueva vista y desactivar la anterior
	vistaActiva.classList.toggle("vistaActiva");
	vistaNueva.classList.toggle("vistaActiva");
	
	//Le saco los show para dejar la visibilidad a cargo de la vistaActiva
	// vistaActiva.classList.toggle("show");
	// vistaNueva.classList.toggle("show");

}

