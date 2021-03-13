class Painel {
	//reinicia o painel ao começar o jogo novo
	reset(){
		this.grid = this.getPainelVazio();
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
				//retorna se a posição não está ocupada(vazia)
					this.grid[y] && this.grid[y][x] === 0 ||
					//ou se está nos limites do painel E acima do chão
					(x >= 0 && x < COLUNA &&
					 y <= LINHA)
				);
			});
		});

	}
}