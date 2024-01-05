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
	posicaoX = Math.floor(Math.random() * largura) - 50;
	posicaoY = Math.floor(Math.random() * altura) - 50;

	// Controle para que a imagem não suma ou crie uma barra de rolagem
	posicaoX = posicaoX < 0 ? 0 : posicaoX;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	console.log(posicaoX, posicaoY);
}

ajustarTamanhoPagina();
gerarPosicaoRandomica();

// Atribuição da função acima como "ouvinte" do evento de redimensionamento do body
body.onresize = ajustarTamanhoPagina;

// Manipulação do DOM
let mosca = document.createElement('img');
mosca.src = './imagens/mosca.png';
mosca.className = 'mosca';
mosca.style.left = posicaoX + 'px';
mosca.style.top = posicaoY + 'px';

document.body.appendChild(mosca);
