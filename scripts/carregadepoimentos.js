function carregaDepoimentos() {
  let db = firebase.firestore();
  //var database = firebase.database();
  let html = '';
  db.collection('depoimentos')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.id);
        console.log(doc.data().depoimento);
        var div = document.createElement('div');
        var row = document.createElement('div');
        var col1 = document.createElement('div');
        var col2 = document.createElement('div');
        var col3 = document.createElement('div');
        var span = document.createElement('span');
        var icon = document.createElement('i');
        var linha = document.createElement('br');
        contador++;

        //Add classes
        div.classList.add('container');
        row.classList.add('row');
        col1.classList.add('col-2', 'text-center');
        col2.classList.add('col-9');
        col3.classList.add('col-1', 'text-center');
        icon.classList.add('fas', 'fa-user-circle');

        const hex = ((Math.random() * 0xffffff) << 0).toString(16);

        //Add style
        row.style.padding = '1rem 1rem';
        icon.style.fontSize = '36px';
        icon.style.color = `#${hex}`;

        col1.style.backgroundColor = 'white';
        col2.style.backgroundColor = '#DCDCDC';
        col1.style.border = '1px transparent';
        col1.style.borderRadius = '0.2rem';
        col2.style.padding = '0.6rem 0.2rem';
        col2.style.border = '1px transparent';
        col2.style.borderRadius = '0.2rem';
        col2.style.padding = '0.6rem 0.8rem';
        col3.style.backgroundColor = 'white';
        col3.style.border = '1px transparent';
        col3.style.borderRadius = '0.2rem';
        col3.style.padding = '0.5rem';

        var text = document.createTextNode(doc.data().depoimento);
        span.appendChild(text);

        document.getElementById('depoimentos').appendChild(div);
        div.append(row);
        row.append(col1);
        row.append(col2);
        row.append(col3);
        col1.append(icon);
        col2.append(span);

        const image = document.createElement('img');
        image.src = 'img/icon2.png';
        image.style.width = '30px';
        image.style.cursor = 'pointer';
        let id = doc.id;
        image.setAttribute("onclick", `curtir('${id}')`);
        col3.append(image);
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
        // console.log(contador);
      });
    });
}

function curtir(id) {
  let db = firebase.firestore();
  let docRef = db.collection("depoimentos").doc(id);

  //Rebeca agora parece que está funcionando. 
  /* Deixa eu explicar o que está acontecendo aqui. Primeiro eu faço a leitura do 
  número de curtir que o depoimento já teve. Depois eu somo um nesse valor e somente após isso armazeno novamente no banco. 
  Agora cada depoimento, no banco de dados, tem o número de curtidas.
  Seria legal vocẽ tentar colocar esse número na tela agora. 
  */
  docRef.get().then((doc) => {
    if (doc.exists) {
      let curtir = doc.data().curtir + 1;
       // Atualizar curtir
      db.collection("depoimentos").doc(id).update({ curtir: curtir });
    } else {
      console.log("Depoimento não encontrado!");
    }
  }).catch((error) => {
    console.log("Erro para recuperar os dados do banco de dados:", error);
  });


}