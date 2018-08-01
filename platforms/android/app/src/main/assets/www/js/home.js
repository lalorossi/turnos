
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
	}

	//Los 3 objetos de trabajo
	var personaJuli= new Persona("Juli", "purple", "white");
	var personaGuady= new Persona("Guady", "orange", "black");
	var personaSebi= new Persona("Sebi", "green", "white");

	//Array de todos los usuarios
	arrayPersonas = [];
	arrayPersonas.push(personaJuli);
	arrayPersonas.push(personaGuady);
	arrayPersonas.push(personaSebi);
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

	SqlServer.init("den1.mysql5.gear.host", "SQLEXPRESS", "appturnos", "Ma3R8882~Y?O	", "appturnos", function(event) {
	  window.alert(JSON.stringify(event));
	}, function(error) {
	  window.alert(JSON.stringify(error));
	});

}

//Crea los datos y establece lo necesario para empezar a trabajar
//Dejar siempre al final para que tenga ya declaradas todas las funciones
function onLoad(){
	crearVariables();
	iniciarPagina();
}
