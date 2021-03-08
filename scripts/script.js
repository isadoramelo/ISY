function enviaformulario(evento){
	/*alert(evento.target);
	evento.preventDefault();
	console.log (evento.target);
	console.log ("Cheguei na função");*/
	let nome=document.getElementById("nome").value;
	if(!nome){
		return;
	}
	let idade=document.getElementById("idade").value;
	if(!idade){
		return;
	}
	let email=document.getElementById("email").value;
	if(!email){
		return;
	}
	let password=document.getElementById("password").value;
	if(!password){
		return;
	}
	alert(nome);
	alert(idade);
	alert(email);
	alert(password);
}