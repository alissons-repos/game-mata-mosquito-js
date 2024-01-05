let altura = 0;
let largura = 0;
let body = document.getElementById('root');

function ajustarTamanhoPagina() {
	altura = window.innerHeight;
	largura = window.innerWidth;
	console.log(altura, largura);
}

body.onresize = ajustarTamanhoPagina;
