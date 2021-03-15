//recupera o elemento
const canvas = document.getElementById('painel');
//obtem o contexto 2d
const ctx = canvas.getContext('2d');

//Calcula o tamanho do elemento canvas
ctx.canvas.width = COLUNA * TAM_BLOCO;
ctx.canvas.height = LINHA * TAM_BLOCO;

//escala o tamanho dos blocos
ctx.scale(TAM_BLOCO, TAM_BLOCO);

let painel = new Painel();

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
	}
});