// Declaração de variáveis globais
let largura = 0;
let altura = 0;
let pontuacao = 0;
let pontos = 'pontos';
let body = document.getElementById('raiz');
let start = document.getElementById('start');

function ajustarTamanhoPagina() {
	largura = window.innerWidth;
	altura = window.innerHeight;
}

function gerarMoscaEmPosicaoRandomica() {
	const variacao = gerarTamanhoRandomico();

	let posicaoX = Math.floor(Math.random() * largura) - variacao;
	let posicaoY = Math.floor(Math.random() * altura) - variacao;

	// Controle para que a imagem não suma ou crie uma barra de rolagem
	posicaoX = posicaoX < 0 ? 0 : posicaoX;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

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
	mosca.style.cursor = 'pointer';

	body.appendChild(mosca);
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

function selecionarLevel() {
	const level = document.getElementById('selecao').value;

	switch (level) {
		case 'facil':
			return 1200;
		case 'moderado':
			return 1000;
		case 'dificl':
			return 800;
		case 'muito dificil':
			return 600;
		default:
			return 1000;
	}
}

function matarMosca() {
	pontuacao++;
	pontos = pontuacao > 1 || pontuacao < 1 ? 'pontos' : 'ponto';

	document.getElementById('pontuacao').innerHTML = `${pontuacao} ${pontos}`;

	this.remove();
}

function iniciarJogo() {
	let vidas = 1;
	let preparacao = 3;
	let tempo = 30;
	let segundos = 'segundos';
	pontuacao = 0;
	pontos = 'pontos';

	document.getElementById('pontuacao').innerHTML = `${pontuacao} ${pontos}`;
	document.getElementById('tempo').innerHTML = `${tempo} ${segundos}`;
	document.getElementById('preparar').innerHTML = preparacao;

	document.getElementById('inicio').style.display = 'none';
	document.getElementById('vitoria').style.display = 'none';
	document.getElementById('derrota').style.display = 'none';

	document.getElementById('preparar').style.display = 'block';
	document.getElementById('painel').style.display = 'flex';
	document.getElementById('pontos').style.display = 'flex';

	for (let i = 1; i <= 3; i++) {
		document.getElementById('v' + i).src = './imagens/coracao_cheio.png';
	}

	const preparar = setInterval(() => {
		preparacao--;

		if (preparacao < 1) {
			clearInterval(preparar);
			document.getElementById('preparar').innerHTML = `Sobreviva!`;
		} else {
			document.getElementById('preparar').innerHTML = preparacao;
		}
	}, 1000);

	const delayPreparacao = setTimeout(() => {
		const jogoRodando = setInterval(() => {
			if (document.getElementById('mosca')) {
				document.getElementById('mosca').remove();

				if (vidas > 3) {
					clearInterval(cronometro);
					clearInterval(jogoRodando);
					document.getElementById('painel').style.display = 'none';
					document.getElementById('pontos').style.display = 'none';
					document.getElementById('derrota').style.display = 'flex';
					return;
				} else {
					document.getElementById('v' + vidas).src = './imagens/coracao_vazio.png';
					vidas++;
				}
			}

			gerarMoscaEmPosicaoRandomica();

			if (document.getElementById('preparar')) {
				document.getElementById('preparar').style.display = 'none';
			}
		}, selecionarLevel());

		const cronometro = setInterval(() => {
			tempo--;
			segundos = tempo > 1 || tempo < 1 ? 'segundos' : 'segundo';

			if (tempo < 0) {
				clearInterval(cronometro);
				clearInterval(jogoRodando);
				document.getElementById('mosca').remove();
				document.getElementById('painel').style.display = 'none';
				document.getElementById('pontos').style.display = 'none';
				document.getElementById('vitoria').style.display = 'flex';
				return;
			} else {
				document.getElementById('tempo').innerHTML = `${tempo} ${segundos}`;
			}
		}, 1000);

		clearTimeout(delayPreparacao);
	}, 3000);
}

// Chamando função para ajustar o tamanho da página disponível
ajustarTamanhoPagina();

// Atribuição da função acima como "ouvinte" do evento de redimensionamento do body
body.onresize = ajustarTamanhoPagina;
start.onclick = iniciarJogo;

// Iniciando painel de tempo e preparação
document.getElementById('vitoria').style.display = 'none';
document.getElementById('derrota').style.display = 'none';
