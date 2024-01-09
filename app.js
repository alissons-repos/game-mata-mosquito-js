let largura = 0;
let altura = 0;
let vidas = 1;
let preparacao = 3;
let tempo = 6;
let body = document.getElementById('raiz');
let start = document.getElementById('start');

// Função que indica o tamanho da página
function ajustarTamanhoPagina() {
	largura = window.innerWidth;
	altura = window.innerHeight;
	// console.log(largura, altura);
}

function gerarMoscaEmPosicaoRandomica() {
	// Remover mosca "vivas", caso existam
	if (document.getElementById('mosca')) {
		document.getElementById('mosca').remove();

		if (vidas > 3) {
			// Uma alternativa para o fim de jogo seria criar outra página html
			// window.location.href = 'game-over.html';

			clearInterval(cronometro);
			clearInterval(jogoRodando);
			document.getElementById('painel').remove();

			const gameOver = document.createElement('img');
			gameOver.src = './imagens/game_over.png';
			gameOver.className = 'vitoria-gameover';
			body.appendChild(gameOver);
			return;
		} else {
			document.getElementById('v' + vidas).src = './imagens/coracao_vazio.png';
			vidas++;
		}
	}
	const variacao = gerarTamanhoRandomico();

	let posicaoX = Math.floor(Math.random() * largura) - variacao;
	let posicaoY = Math.floor(Math.random() * altura) - variacao;

	// Controle para que a imagem não suma ou crie uma barra de rolagem
	posicaoX = posicaoX < 0 ? 0 : posicaoX;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	// Manipulando o DOM para mostrar a mosca
	const mosca = document.createElement('img');

	mosca.src = './imagens/mosca.png';
	mosca.id = 'mosca';
	mosca.className = gerarLadoRandomico();

	mosca.onclick = matarMosca;
	mosca.style.zIndex = '3';
	mosca.style.height = variacao + 'px';
	mosca.style.width = variacao + 'px';
	mosca.style.position = 'absolute';
	mosca.style.left = posicaoX + 'px';
	mosca.style.top = posicaoY + 'px';

	document.body.appendChild(mosca);

	console.log(variacao, posicaoX, posicaoY);
}

function gerarTamanhoRandomico() {
	const tamanho = Math.floor(Math.random() * 3);

	switch (tamanho) {
		case 0:
			return 50;
		case 1:
			return 75;
		case 2:
			return 100;
	}
}

function gerarLadoRandomico() {
	const lado = Math.floor(Math.random() * 2);

	switch (lado) {
		case 0:
			return 'lado1';
		case 1:
			return 'lado2';
	}
}

function matarMosca() {
	this.remove();
}

function iniciarJogo() {
	const preparar = setInterval(() => {
		preparacao -= 1;
		if (preparacao <= 0) {
			clearInterval(preparar);
			// document.getElementById('preparar').innerHTML = 'Já !!!';
			document.getElementById('preparar').remove();
			return;
		} else {
			document.getElementById('preparar').innerHTML = preparacao;
		}
	}, 1000);

	const jogoRodando = setInterval(() => {
		// document.getElementById('inicio').remove();
		gerarMoscaEmPosicaoRandomica();
	}, 1000);
}

// Chamando função para ajustar o tamanho da página disponível
ajustarTamanhoPagina();

// Atribuição da função acima como "ouvinte" do evento de redimensionamento do body
body.onresize = ajustarTamanhoPagina;
body.onclick = iniciarJogo;

// Iniciando painel de tempo e preparação
document.getElementById('cronometro').innerHTML = tempo;
document.getElementById('preparar').innerHTML = preparacao;

const cronometro = setInterval(() => {
	tempo -= 1;

	if (tempo < 0) {
		clearInterval(cronometro);
		clearInterval(jogoRodando);
		document.getElementById('mosca').remove();
		document.getElementById('painel').remove();

		const vitoria = document.createElement('img');
		vitoria.src = './imagens/vitoria.png';
		vitoria.className = 'vitoria-gameover';
		body.appendChild(vitoria);
		return;
	} else {
		document.getElementById('cronometro').innerHTML = tempo;
	}
}, 1000);

const inicioJogo = setTimeout(() => {}, 3000);

// const preparar = setInterval(() => {
// 	preparacao -= 1;
// 	if (preparacao <= 0) {
// 		clearInterval(preparar);
// 		// document.getElementById('preparar').innerHTML = 'Já !!!';
// 		document.getElementById('preparar').remove();
// 		return;
// 	} else {
// 		document.getElementById('preparar').innerHTML = preparacao;
// 	}
// }, 1000);

// const jogoRodando = setInterval(() => {
// 	// document.getElementById('inicio').remove();
// 	gerarMoscaEmPosicaoRandomica();
// }, 1000);
