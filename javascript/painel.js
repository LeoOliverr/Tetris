class Painel {
	ctx;
	ctxNext;
	grid;
	peca;
	next;
	idRequisicao;
	tempo;
	
	//definir método de inicialização
	init(){
		//Calcula o tamanho do canvas
		this.ctx.canvas.width = COLUNA * TAM_BLOCO;
		this.ctx.canvas.height = LINHA * TAM_BLOCO;
		//escala para não precisar recalcular
		this.ctx.scale(TAM_BLOCO, TAM_BLOCO);
	}
	desenho(){
		this.peca.desenho();
		this.desenhoPainel();
	}
	desenhoPainel(){
		this.grid.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value > 0){
					this.ctx.fillStyle = CORES(value);
					this.ctx.fillRect(x, y, 1, 1);
				}
			})
		})
	}
	getNovaPeca(){
		this.next = new Peca(this.ctxNext);
		this.ctxNext.clearRect(
		0,
		0,
		this.ctxNext.canvas.width,
		this.ctxNext.canvas.height
		);
		this.next.desenho();
	}
	//reinicia o painel ao começar o jogo novo
	reset(){
		this.grid = this.getPainelVazio();
		this.peca = new Peca(this.ctx);
		this.peca.setPosicaoInicial();
		this.getNovaPeca();
	}
	//retorna matriz preenchida com zeros
	getPainelVazio(){
		return Array.from(
			{length: LINHA}, () => Array(COLUNA).fill(0)
		);
	}
	validar(p){
		return p.shape.every((row, dy) => {
			return row.every((value, dx) => {
				let x = p.x + dx;
				let y = p.y + dy;
				return (
					value === 0 ||
					(this.parede(x) && this.base(y) && this.naoOcupado(x, y))
				);
			});
		});
	}
	parede(x){
		return x >= 0 && x < COLUNA;
	}
	base(y){
		return y <= LINHA;
	}
	naoOcupado(x, y){
		return this.grid(y) && this.grid(y)(x) === 0;
	}
	
	rotate(peca){
		let p = JSON.parse(JSON.stringify(peca));
		
		for(let y = 0; y < p.shape.length; ++y){
			for(let x = 0; x < y; ++x){
				[p.shape[x][y], p.shape[y][x]] = p.shape[y][x], p.shape[x][y]];
			}
		}
		
		p.shape.forEach(row => row.reverse());
		return p;
	}
	
	
}