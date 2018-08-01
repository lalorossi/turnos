
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
			if(alguien != this){
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

	turnos = new Turnos(personaJuli, personaGuady, personaSebi);
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

function mostrarEstado(){
	contenedorJ = document.getElementById("estadoJ");
	contenedorJ.innerHTML = "JULI";
	contenedorJ.innerHTML += "<br/>";
	contenedorJ.innerHTML += "Siguientes realizadores: ";
	contenedorJ.innerHTML += personaJuli.siguienteRealizador[0].nombre;
	if(personaJuli.siguienteRealizador[1] != null) contenedorJ.innerHTML += personaJuli.siguienteRealizador[1].nombre;
	if(personaJuli.siguienteRealizador[2] != null) contenedorJ.innerHTML += personaJuli.siguienteRealizador[2].nombre;
	if(personaJuli.siguienteRealizador[3] != null) contenedorJ.innerHTML += personaJuli.siguienteRealizador[3].nombre;
	contenedorJ.innerHTML += "<br/>";
	contenedorJ.innerHTML += "<br/>";

	contenedorG = document.getElementById("estadoG");
	contenedorG.innerHTML = "GUADY";
	contenedorG.innerHTML += "<br/>";
	contenedorG.innerHTML += "Siguientes realizadores: ";
	contenedorG.innerHTML += personaGuady.siguienteRealizador[0].nombre;
	if(personaGuady.siguienteRealizador[1] != null) contenedorG.innerHTML += personaGuady.siguienteRealizador[1].nombre;
	if(personaGuady.siguienteRealizador[2] != null) contenedorG.innerHTML += personaGuady.siguienteRealizador[2].nombre;
	if(personaGuady.siguienteRealizador[3] != null) contenedorG.innerHTML += personaGuady.siguienteRealizador[3].nombre;
	contenedorG.innerHTML += "<br/>";
	contenedorG.innerHTML += "<br/>";

	contenedorS = document.getElementById("estadoS");
	contenedorS.innerHTML = "SEBI";
	contenedorS.innerHTML += "<br/>";
	contenedorS.innerHTML += "Siguientes realizadores: ";
	contenedorS.innerHTML += personaSebi.siguienteRealizador[0].nombre;
	if(personaSebi.siguienteRealizador[1] != null) contenedorS.innerHTML += personaSebi.siguienteRealizador[1].nombre;
	if(personaSebi.siguienteRealizador[2] != null) contenedorS.innerHTML += personaSebi.siguienteRealizador[2].nombre;
	if(personaSebi.siguienteRealizador[3] != null) contenedorS.innerHTML += personaSebi.siguienteRealizador[3].nombre;
	contenedorS.innerHTML += "<br/>";
	contenedorS.innerHTML += "<br/>";

	contenedorS.innerHTML += ("Le toca a: " + turnos.aQuienLeToca().nombre + " en el turno de: " + turnos.getPosicion().nombre);
}

function clickHacerTurnoJ(){
	turnos.hacerTurno(personaJuli);	
}

function clickHacerTurnoG(){
	turnos.hacerTurno(personaGuady);
}

function clickHacerTurnoS(){
	turnos.hacerTurno(personaSebi);
}

//Crea los datos y establece lo necesario para empezar a trabajar
//Dejar siempre al final para que tenga ya declaradas todas las funciones
function onLoad(){
	crearVariables();
	iniciarPagina();
	mostrarEstado();
}
