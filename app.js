let largura = 0;
let altura = 0;
let posicaoX = 0;
let posicaoY = 0;
let body = document.getElementById('root');

// Função que indica o tamanho da página
function ajustarTamanhoPagina() {
	largura = window.innerWidth;
	altura = window.innerHeight;
	console.log(largura, altura);
}

function gerarPosicaoRandomica() {
	const [variacao] = gerarTamanhoRandomico();

	posicaoX = Math.floor(Math.random() * largura) - variacao;
	posicaoY = Math.floor(Math.random() * altura) - variacao;

	// Controle para que a imagem não suma ou crie uma barra de rolagem
	posicaoX = posicaoX < 0 ? 0 : posicaoX;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	console.log(variacao, posicaoX, posicaoY);
}

function gerarTamanhoRandomico() {
	const tamanho = Math.floor(Math.random() * 3);

	switch (tamanho) {
		case 0:
			return [50, 'mosca1'];
		case 1:
			return [75, 'mosca2'];
		case 2:
			return [100, 'mosca3'];
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

ajustarTamanhoPagina();
gerarPosicaoRandomica();

// Atribuição da função acima como "ouvinte" do evento de redimensionamento do body
body.onresize = ajustarTamanhoPagina;

// Manipulação do DOM
let [, tamanhoStyle] = gerarTamanhoRandomico();
let mosca = document.createElement('img');
mosca.src = './imagens/mosca.png';
mosca.className = `${tamanhoStyle} ${gerarLadoRandomico()}`;
mosca.style.left = posicaoX + 'px';
mosca.style.top = posicaoY + 'px';

document.body.appendChild(mosca);
