const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const num3 = document.getElementById('num3');
let values = [];
const qtdSequencia = 8

function decipher() {
    if (verificaNum()) {
        if (isPa()) {
            createPA();
            exibirMsg('Progressão Aritmética');
        } else if (isPg()) {
            createPG();
            exibirMsg('Progressão Geométrica');
        } else {
            createPP();
            exibirMsg('Padrão Personalizado');
        }
    }
}

function verificaNum() {
    const valor1 = parseInt(num1.value);
    const valor2 = parseInt(num2.value);
    const valor3 = parseInt(num3.value);
    values = [valor1, valor2, valor3];

    if (num1.value == '' || num2.value == '' || num3.value == '') {
        alert('Campos vazios não são permitidos')
        return false;
    }

    if (isNaN(valor1) || isNaN(valor2) || isNaN(valor3) ||
        valor1 < 0 || valor2 < 0 || valor3 < 0 ||
        !Number.isInteger(valor1) || !Number.isInteger(valor2) || !Number.isInteger(valor3)) {
        alert("Insira apenas números inteiros maiores ou iguais a zero.")
        return false;
    }


    return true;
}

// verifica igualdade de razão e retorna um booleano
function isPa() {
    return (values[1] - values[0]) === (values[2] - values[1]);
}

function isPg() {
    return (values[1] / values[0]) === (values[2] / values[1]);
}

// cria sequencia
function createPA() {
    const razao = values[1] - values[0];
    for (let i = 3; i < qtdSequencia; i++) {
        values[i] = values[i - 1] + razao;
    }
}
function createPG() {
    const razao = values[1] / values[0];
    for (let i = 3; i < qtdSequencia; i++) {
        values[i] = values[i - 1] * razao;
    }
}
function createPP() {
    for (let i = 3; i < qtdSequencia; i++) {
        values[i] = values[i - 1] + values[i - 2];
    }
}

// exibe mensagem
function exibirMsg(msg) {
    const title = document.getElementById('typePgr');
    const paragrafo = document.getElementById('progressao');
    title.textContent = `${msg}`
    paragrafo.textContent =`Sequencia: ${values}`;
}



