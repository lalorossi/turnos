
//Clase para la logica de las personas con metodos para turnos
class Persona{
	constructor(nombreIng, color){
		this.nombre = nombreIng;
		this.colorFondo = color;
		this.siguienteRealizador = [this];
	}
}

//Los 3 objetos de trabajo
var personaJuli= new Persona("Juli", "purple");
var personaGuady= new Persona("Guady", "orange");
var personaSebi= new Persona("Sebi", "green");

//Array de todos los usuarios
arrayPersonas = [];
arrayPersonas.push(personaJuli);
arrayPersonas.push(personaGuady);
arrayPersonas.push(personaSebi);

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

//Cambia el fondo dependiendo del usuario
document.body.style = "background-color: " + usuarioActual.colorFondo;
