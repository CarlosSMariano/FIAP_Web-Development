const coresInput = document.getElementById('corInput');
const listaCores = document.getElementById('listaCores');
let cores = [];

const coresDefinidas = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    yellow: '#FFFF00',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#808080',
    purple: '#800080',
    orange: '#FFA500',
    pink: '#FFC0CB'
}

coresInput.addEventListener('keypress', function(event) {
    if(event.key == 'Enter'){
        const nomeCor = coresInput.value.trim().toLowerCase();
        if(nomeCor){
            const codigoCor = coresDefinidas[nomeCor] || '';
            cores.unshift({nome: nomeCor, codigo: codigoCor});
            atualizarLista();
            coresInput.value = '';
        };
    }; 
});

function atualizarLista(){
    listaCores.innerHTML = ''
    cores.forEach(c => {
        const novoItem = document.createElement('li');
        novoItem.textContent = c.nome
        if(c.codigo){
            novoItem.style.backgroundColor = c.codigo;
        }
        listaCores.appendChild(novoItem);
    });
}

