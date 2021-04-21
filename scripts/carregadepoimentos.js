function carregaDepoimentos(){
	let db = firebase.firestore();
	//var database = firebase.database();
	let html= "";
	db.collection("depoimentos").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			// console.log(`${doc.id} => ${doc.data()}`);
			console.log(doc.id);
			console.log(doc.data().depoimento);
			var div = document.createElement('div');
			var row = document.createElement('div');
			var col1 = document.createElement('div');
			var col2 = document.createElement('div');
			var span = document.createElement('span');
			var icon = document.createElement('i');
			var linha = document.createElement('br');

        //Add classes
        div.classList.add('container');
        row.classList.add('row');
        col1.classList.add('col-2', 'text-center');
        col2.classList.add('col-10');
        icon.classList.add('fas', 'fa-user-circle');

        //Add style
        row.style.padding = '1rem 1rem';
        icon.style.fontSize = '36px';
        icon.style.color = 'pink';

        col1.style.backgroundColor = 'white';
        col2.style.backgroundColor = '#DCDCDC';
        col1.style.border = '1px transparent';
        col1.style.borderRadius = '0.2rem';
        col1.style.padding = '0.2rem';
        col2.style.border = '1px transparent';
        col2.style.borderRadius = '0.2rem';

        var text = document.createTextNode(doc.data().depoimento);
        span.appendChild(text);

        document.getElementById('depoimentos').appendChild(div);
        div.append(row);
        row.append(col1);
        row.append(col2);
        col1.append(icon);
        col2.append(span);
        document.getElementById('depoimentos').appendChild(linha);
        //<div>
        //<row>
        //<col1>
        //<i>
        //<col1/>
        //<col2>
        //<span>
        //<col2/>
        //</row>
        //<div/>
        //<br>
    })
	})
}
