var frase = document.getElementById("frase");
 var resposta = document.getElementById("resposta");

function search() {
    if (verificaInput()){
        meuJson();
    }
  }

function verificaInput(){
    if(frase.value == ''){
        alert("Elementos vazios não são permitidos");
        return false;
    }
    return true;
}

function meuJson(){
    const json = '[{"title": "Papa morre","type": true},{"title":"Vacinas causam autismo", "type": false} , {"title":"Pepsi cola está utilizando fetos abortados como adoçante", "type": false}, {"title": "Magreza extrema faz mal", "type": true}]';

    const product = JSON.parse(json);

    verificaNoticia(product);
}

function verificaNoticia(product){
  for (const elem of product) {
        console.log(`Título: ${elem.title.toLowerCase().trim()} Type: ${elem.type} \n`)
        if(elem.title.toLowerCase().trim() === frase.value.toLowerCase().trim() && elem.type == true){
            resposta.textContent = 'Notícia verificada!';
            break;
        }else{
            resposta.textContent = 'Fake news!!!'
        }
    }
}