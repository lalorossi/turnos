
//Clases para cada usuario (J,G, S)
class Persona{
    constructor(nombreIng, contraseñaIng){
        this.nombre = nombreIng;
        this.contraseña = contraseñaIng;
        this.siguienteRealizador = [this];
    }
}

//Contraseñas fijas de cada usuario. (Cambiar por MD5)
contraseñaJuli = "Salem";
contraseñaGuady = "Jaima";
contraseñaSebi = "Dios";

//Objetos de cada usuario
PersonaJuli = new Persona("Juli", contraseñaJuli);
PersonaGuady = new Persona("Guady", contraseñaGuady);
PersonaSebi = new Persona("Sebi", contraseñaSebi);

//Array para recorrer a las personas
arrayPersonas = [];
arrayPersonas.push(PersonaJuli);
arrayPersonas.push(PersonaGuady);
arrayPersonas.push(PersonaSebi);

//Variable que guarda el objeto con el usuario que iniciara sesion
usuarioSesion = null;

//Valida usuario y contraseña del formulario con los datos de los objetos
function validarLogin(formulario) {
	//Borra el usuario sesion (por si a caso)
	usuarioSesion = null;

	//Accede a los datos ingresados
	var inpUser = document.getElementById("inpUser").value;
	var inpPass = document.getElementById("inpPass").value;

	//Para guardar el resultado de las comparaciones
	var usuarioValido = false;

	//Formato de foreach para un array que ejecuta la funcion descripta
	//El foreach compara el ingreso con los objetos de personas
	arrayPersonas.forEach(function(persona){
		//Compara el ingreso a usuarios y contraseñas y guarda si hay un correcto y el usuario que inicia sesion
		if(persona.nombre == inpUser && persona.contraseña == inpPass){
			usuarioSesion = persona;
		}
	});

	//Si no hay un correcto, muestra una advertencia
	if(!usuarioSesion) window.alert("Usuario y contraseña no validos");

	return (usuarioSesion || false);	
}