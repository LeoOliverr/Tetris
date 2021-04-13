//recupera o elemento
const canvas = document.getElementById('painel');
//obtem o contexto 2d
const ctx = canvas.getContext('2d');

let idRequest;
let painel = new Painel();
addEventListener();
initNext();

function initNext(){
//Calcula o tamanho do elemento canvas
ctx.canvas.width = COLUNA * TAM_BLOCO;
ctx.canvas.height = LINHA * TAM_BLOCO;

//escala o tamanho dos blocos
//utilizando o scale não é necessário recalcular o tamanho dos blocos manualmente
ctx.scale(TAM_BLOCO, TAM_BLOCO);
}

function play(){
	painel.reset();
	let peca = new Peca(ctx);
	peca.desenho();
	
	painel.peca = peca;
	console.table(painel.grid);
}

document.addEventListener('keydown', event => {
	if (movimento[event.keyCode]) {
		//Evita a ativação de dois handlers para o mesmo evento
		event.preventDefault();
		
		//Obtem o novo estado da peça
		let p = movimento[event.keyCode](painel.peca);
		
		if (event.keyCode === KEY.SPACE) {
		//Queda livre
		while (painel.validar(p)) {
			painel.peca.mover(p);
			p = movimento[KEY.DOWN](painel.peca);
			//Limpa a posição anterior antes de move-la
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			
			painel.peca.desenho();
		}
		}
		
		
		if(painel.validar(p)){
			//Se o movimento for válido, efetua o movimento da peça
			painel.peca.mover(p);
			
			//Limpa a posição anterior antes de move-la
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				
			painel.peca.desenho();
		}
		if(event.keyCode === KEY.P){
			pausa();
		}
		if(event.keyCode === KEY.ESC){
			gameOver();
		}
	}
});
//elemento e contexto proxima peça
const canvasNext = document.getElementById('proximo');
const ctxNext = canvasNext.getContext('2d');

function pausa(){
	if (!idRequest){
		animar();
		return;
	}
	cancelAnimationFrame(idRequest);
	idRequest = null;
	
	ctx.fillStyle = 'black';
	ctx.fillRect(1, 3, 8, 1.2);
	ctx.font = '1px Arial';
	ctx.fillStyle = 'yellow';
	ctx.fillText('PAUSA', 3, 4);
}
function gameOver(){
	cancelAnimationFrame(idRequest);
	ctx.fillStyle = 'black';
	ctx.fillRect(1, 3, 8, 1.2);
	ctx.font = '1px Arial';
	ctx.fillStyle = 'red';
	ctx.fillText('Game Over', 1.8, 4);
}
function animar(now = 0){
	time.elapsed = now - time.start;
	if(time.elapsed > time.level){
		time.start = now;
		if (!painel.derruba()){
			gameOver();
			return;
		}
	}
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	painel.desenho();
		idRequest = requestAnimationFrame(animar);
}