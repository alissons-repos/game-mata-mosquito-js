let largura = 0;
let altura = 0;
let body = document.getElementById('raiz');

// Função que indica o tamanho da página
function ajustarTamanhoPagina() {
	largura = window.innerWidth;
	altura = window.innerHeight;
	console.log(largura, altura);
}

function gerarMoscaEmPosicaoRandomica() {
	// Remover moscas anterior caso exista
	if (document.getElementById('mosca')) {
		document.getElementById('mosca').remove();
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

	// Tamanho de height e width definidos também no css
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
	const lado = Math.floor(Math.random() * 2);

	switch (lado) {
		case 0:
			return 'lado1';
		case 1:
			return 'lado2';
	}
}

// Chamando função para ajustar o tamanho da página disponível
ajustarTamanhoPagina();

// Atribuição da função acima como "ouvinte" do evento de redimensionamento do body
body.onresize = ajustarTamanhoPagina;

// setInterval(() => {
// 	gerarMoscaEmPosicaoRandomica();
// }, 1000);
