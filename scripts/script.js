function enviaformulario(evento) {
	event.preventDefault();
	console.log("[Função cadastro de usuárias]");
	let nome = document.getElementById("nomeusuaria").value;
	if (!nome) {
		alert("Preencha o nome por favor.")
		return;
	}
	let idade = document.getElementById("idade").value;
	if (!idade) {
		alert("Preencha a idade por favor.")
		return;
	}
	let email = document.getElementById("email").value;
	if (!email) {
		alert("Preencha o email por favor.")
		return;
	}
	let password = document.getElementById("password").value;
	if (!password) {
		alert("Preencha a password por favor.")
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
			console.log(userlogged.displayName);
			alert("Usuária criada com sucesso");
			firebase.auth().signInWithEmailAndPassword(email, password)
				.then(function () {
					console.log("Usuário logado com sucesso");
					let user = firebase.auth().currentUser;
					localStorage.setItem('nome', user.displayName)
					iniciaAplicacao();
				})
				.catch(function (error) {
					console.log("Usuário não autenticado!");
					var errorCode = error.code;
					var errorMessage = error.message;
					/* document.getElementById("errorMessage").innerText = errorMessage;*/

				})

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

function autenticar(evento) {
	event.preventDefault();
	let email = document.getElementById("email").value;
	if (!email) {
		return;
	}
	let password = document.getElementById("password").value;
	if (!password) {
		return;
	}
	//console.log(email);
	//console.log(password);

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function () {
			console.log("Usuário logado com sucesso");
			let user = firebase.auth().currentUser;
			//console.log(user);
			//console.log(user.displayName);
			localStorage.setItem('nome', user.displayName)
			iniciaAplicacao();			/*document.getElementById("message").innerText = "Usuário autenticado com sucesso.";*/
		})
		.catch(function (error) {
			console.log("Usuário não autenticado!");
			var errorCode = error.code;
			var errorMessage = error.message;
			/* document.getElementById("errorMessage").innerText = errorMessage;*/

		}
		)
}

function logout() {
	firebase.auth().signOut().then(() => {
		localStorage.removeItem('nome');
		alert('Logout com sucesso!');
		iniciaAplicacao();
	}).catch((error) => {
		console.log('Erro ao desconectar usuária');
	});
}

function gravarDepoimento(evento) {
	event.preventDefault();
	let depoimento = document.getElementById("depoimento").value;
	if (!depoimento) {
		return;
	}
	let db = firebase.firestore();
	//var database = firebase.database();
	db.collection("depoimentos").add({
		depoimento: depoimento,
		curtir: 0
	})
		.then(function (docRef) {
			console.log("Depoimento armazenado com sucesso");
			console.log("Depoimento armazenado com ID: ", docRef.id);
			//Recarrega a página para exibir o novo depoimento.
			document.location.reload(true);
		})
		.catch(function (error) {
			console.error("Erro ao incluir o depoimento: ", error);
		});
}

function iniciaAplicacao() {
	let nomeUsuaria = localStorage.getItem('nome');
	if (nomeUsuaria) {
		document.getElementById('login').style.display = "none";
		document.getElementById('logout').style.display = "inline-block";
		const stringParaExibir = 'Olá, ' + nomeUsuaria;
		document.getElementById('nome').innerText = stringParaExibir;
	} else{
		document.getElementById('logout').style.display = "none";
		document.getElementById('login').style.display = "inline-block";
		document.getElementById('nome').innerText = '';

	}
}
