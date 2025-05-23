function search() {
    const content = document.getElementById('frase');
    if (content.value !== '') {
        consulta(content.value);
    } else {
        alert("Campos vazios não são permitidos");
    }
}

function textTransform(texto) {
    return texto.replace(/\s+/g, "+").toLowerCase();
}

async function consulta(content) {
    const pesquisa = textTransform(content);

    const articlesFromAPI = await consumoAPI(pesquisa);
    const resultadoAPI = verificaNoticiaAPI(articlesFromAPI);

    const resultadoMySearch = await verificaMinhaNoticia(pesquisa);

    let statusMensagem = "";
    let resultadoFinal = false;

    if (resultadoAPI || resultadoMySearch) {
        statusMensagem = "Notícia verificada!";
        resultadoFinal = true;
        exibirMSG(statusMensagem, articlesFromAPI);
    } else {
        statusMensagem = "Fake news!!";
        resultadoFinal = false;
        exibirMSG(statusMensagem, articlesFromAPI);
    }


    registerSearchHistory(content, statusMensagem, resultadoFinal, articlesFromAPI);
}

async function consumoAPI(pesquisa) {
    const BASE_URL = `https://newsapi.org/v2/everything?q=${pesquisa}&searchin=title&sortby=relevance&language=pt&apiKey=9922d0d0adcd41b2ae8381fa50b7902a`;
    console.log(BASE_URL);
    const reque = await fetch(BASE_URL);
    return (await reque.json()).articles;
}

function verificaNoticiaAPI(articles) {
    if (articles && articles.length > 0) {
        return true;
    }
    return false;
}

async function verificaMinhaNoticia(pesquisa) {
    const json = '[{"title": "Encontro de bebe reborn"},{"title": "patapim"},{"title": "Bolsonaro broxa"}]';
    const products = JSON.parse(json);

    for (const element of products) {
        let palavraSemEspaco = textTransform(element.title);
        if (palavraSemEspaco.includes(pesquisa.toLowerCase())) {
            return true;
        }
    }
    return false;
}

async function exibirMSG(msg, articlesFromAPI) {
    const finalResult = document.getElementById('finalResult');
    const titleElement = document.getElementById("titulo");
    const conteudoElement = document.getElementById("conteudo");

    finalResult.classList.remove('verde', 'vermelho');

    finalResult.textContent = msg;
    if (msg === "Notícia verificada!") {
        finalResult.classList.add('verde');
    } else {
        finalResult.classList.add('vermelho');
    }

    if (msg === "Notícia verificada!" && articlesFromAPI && articlesFromAPI.length > 1) {
        titleElement.textContent = "Título: " + articlesFromAPI[1].title;

        const linkElement = document.createElement('a');
        linkElement.href = articlesFromAPI[1].url;
        linkElement.textContent = "Veja em: " + articlesFromAPI[1].url;
        linkElement.target = "_blank";

        conteudoElement.innerHTML = '';
        conteudoElement.appendChild(linkElement);

    } else {
        titleElement.textContent = "";
        conteudoElement.textContent = "";
    }
}

function registerSearchHistory(searchedPhrase, resultStatus, isVerified, articles) {
    const now = new Date();
    const timestamp = now.toLocaleString('pt-BR');

    let historicalEntry = {
        frase: searchedPhrase,
        dataHora: timestamp,
        resultado: resultStatus,
        tituloNoticia: '',
        urlNoticia: ''
    };

    if (isVerified && articles && articles.length > 1) {
        historicalEntry.tituloNoticia = articles[1].title;
        historicalEntry.urlNoticia = articles[1].url;
    }

    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.push(historicalEntry);
    localStorage.setItem('searchHistory', JSON.stringify(history));

    console.log("Histórico atualizado:", history);
}

function showHistory() {
    const historyContainer = document.getElementById('historyContainer');
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (history.length === 0) {
        historyContainer.innerHTML = '<p>Nenhum histórico de busca encontrado.</p>';
        return;
    }

    let tableHTML = '<table>';
    tableHTML += '<thead><tr><th>Frase Buscada</th><th>Data/Hora</th><th>Resultado</th><th>Título da Notícia</th><th>URL da Notícia</th></tr></thead>';
    tableHTML += '<tbody>';

    history.forEach(entry => {
        tableHTML += '<tr>';
        tableHTML += `<td>${entry.frase}</td>`;
        tableHTML += `<td>${entry.dataHora}</td>`;
        tableHTML += `<td>${entry.resultado}</td>`;
        tableHTML += `<td>${entry.tituloNoticia || '-'}</td>`;
        if (entry.urlNoticia) {
            tableHTML += `<td><a href="${entry.urlNoticia}" target="_blank">Ver Link</a></td>`;
        } else {
            tableHTML += `<td>-</td>`;
        }
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    historyContainer.innerHTML = tableHTML;
}