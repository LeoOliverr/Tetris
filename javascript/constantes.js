'use strict';
const COLUNA = 10;
const LINHA = 20;
const TAM_BLOCO = 30;

const KEY = {
	LEFT: 37,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
	UP:38,
	P:80,
	ESC: 27
}
Object.freeze(KEY);

const movimento = {
	[KEY.LEFT]: p => ({...p, x: p.x - 1}),
	[KEY.RIGHT]: p => ({...p, x: p.x + 1}),
	[KEY.DOWN]: p => ({...p, y: p.y + 1}),
	[KEY.SPACE]: p => ({...p, y: p.y + 1})
	[KEY.UP]: p => painel.rotate[p]
};

const CORES = [
'cyan',
'blue',
'orange',
'yellow',
'green',
'purple',
'red'
];
Object.freeze(CORES);

const FORMAS = [
	[],
   [[0, 0, 0, 0],
	[1, 1, 1, 1],
	[0, 0, 0, 0],
	[0, 0, 0, 0]],
   [[2, 0, 0],
	[2, 2, 2],
	[0, 0, 0]],
   [[0, 0, 3],
	[3, 3, 3],
	[0, 0, 0]],
   [[4, 4],
	[4, 4]],
   [[0, 5, 5],
    [5, 5, 0],
	[0, 0, 0]],
   [[0, 6, 0],
    [6, 6, 6],
	[0, 0, 0]],
   [[7, 7, 0],
	[0, 7, 7],
	[0, 0, 0]]
];
Object.freeze(FORMAS);

//relação das peças e o intervalo de cada uma
const NIVEL = {
	0: 800,
	1: 720,
	2: 630,
	3: 550,
	4: 470,
	5: 380,
	6: 300,
	7: 220,
	8: 130,
	9: 100,
	10: 80,
	11: 80,
	12: 80,
	13: 70,
	14: 70,
	15: 70,
	16: 50,
	17: 50,
	18: 50,
	19: 30,
	20: 30,
	//29+ será 20ms
}
Object.freeze(NIVEL);