function carregaDepoimentos(){
	let db = firebase.firestore();
	//var database = firebase.database();
	let html= "";
	db.collection("depoimentos").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// console.log(`${doc.id} => ${doc.data()}`);
			console.log(doc.id);
			console.log(doc.data().depoimento);
			var p = document.createElement("p");
			var text = document.createTextNode(doc.data().depoimento);
			p.appendChild(text)
			document.getElementById("depoimentos").appendChild(p);
		})
	})
}
