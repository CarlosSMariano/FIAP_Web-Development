let tempo = parseInt(sessionStorage.getItem('time') || 0); /* || operador lógico or, para caso ouver Nan zerar o relógio */

function atualizar() {
    tempo++
    sessionStorage.setItem('time', tempo.toString());
    exibirMensagem();
}

setInterval(atualizar, 1000);

function exibirMensagem() {
    const segundos = document.getElementById('segundos')
    const mensagem = document.getElementById('mensagem')
    segundos.textContent = tempo;

    if (tempo === 10) {
        mensagem.textContent = 'Por favor, atulize a página!'
    }
}

