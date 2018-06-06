//Valida usuario y contraseña del formulario con los datos esperados de usuario y contraseña
function validarLogin(formulario) {
	//Accede a los datos ingresados
	var user = document.getElementById("inpUser").value;
	var pass = document.getElementById("inpPass").value;

	//Aca habria que usar los objetos de persona para obtener la contraseña encriptada
	//Y comparar con una encriptacion del ingreso
	if(user =="guady" && pass == "jaima"){
		return true;
	}
	if(user =="juli" && pass == "salem"){
		return true;
	}
	else{
		//Si los datos ingresados no coinciden con los esperados, no hace submit
		window.alert("Usuario o contraseña no validos");
		return false;
	}
		
}