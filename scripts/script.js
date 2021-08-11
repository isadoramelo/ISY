function enviaformulario(evento){
	event.preventDefault();
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
	console.log(nome);
	console.log(idade);
	console.log(email);
	console.log(password);
	
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then((user) => {
		console.log("Usuário criado com sucesso");
		let userlogged = firebase.auth().currentUser;
		userlogged.updateProfile({
			displayName: nome
		});
		userlogged = firebase.auth().currentUser;
		console.log (userlogged.displayName);
	})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			console.log("Erro ao criar usuário");
		});
  /*let db = firebase.firestore();
	//var database = firebase.database();
	db.collection("usuarios").add({
		nome: nome,
		idade: idade,
		email: email,
		password: password,
	})
	.then(function(docRef) {
		console.log("Usuário armazenado com sucesso");
		console.log("Usuário armazenado com ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Erro ao incluir o usuário: ", error);
	});*/
}

function autenticar(evento){
	event.preventDefault();
	let email=document.getElementById("email").value;
	if(!email){
		return;
	}
	let password=document.getElementById("password").value;
	if(!password){
		return;
	}
	//console.log(email);
	//console.log(password);
	
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(){
		console.log("Usuário logado com sucesso");
		let user = firebase.auth().currentUser;
		//console.log(user);
		//console.log(user.displayName);
		localStorage.setItem('nome', user.displayName)
		exibeNome();
		/*document.getElementById("message").innerText = "Usuário autenticado com sucesso.";*/
	})
	.catch(function(error) {
		console.log("Usuário não autenticado!");
		var errorCode = error.code;
		var errorMessage = error.message;
		/* document.getElementById("errorMessage").innerText = errorMessage;*/

	}
	)
}
function gravarDepoimento(evento){
	event.preventDefault();
	let depoimento=document.getElementById("depoimento").value;
	if(!depoimento){
		return;
	}
	let db = firebase.firestore();
	//var database = firebase.database();
	db.collection("depoimentos").add({
		depoimento: depoimento,
		curtir: 0
	})
	.then(function(docRef) {
		console.log("Depoimento armazenado com sucesso");
		console.log("Depoimento armazenado com ID: ", docRef.id);
		//Recarrega a página para exibir o novo depoimento.
		document.location.reload(true);
	})
	.catch(function(error) {
		console.error("Erro ao incluir o depoimento: ", error);
	});
}
function exibeNome(){
	let nome = localStorage.getItem('nome');
	console.log (nome);
	if (nome){
		document.getElementById("nome").innerText=nome;
	}
}