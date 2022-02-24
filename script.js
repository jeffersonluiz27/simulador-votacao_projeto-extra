//Chamada do prompt
const prompt = require('prompt-sync')();

//Variaveis Globais
let opcao = 0;
const anoAtual = new Date().getFullYear();

//Lista de Objetos dos candidatos
const candidatos = [
	{ nome: 'Candidato 1', votos: 0 },
	{ nome: 'Candidato 2', votos: 0 },
	{ nome: 'Candidato 3', votos: 0 },
];
let brancos = 0;
let nulos = 0;

//Estrutura principal do programa
while (opcao != 2) {
	console.clear();
	console.log(`Seja bem vindo as eleições ${anoAtual}\n`);
	prompt('Pressione ENTER para começar!');

	console.clear();
	let anoN = parseInt(prompt('Informe sua data de nascimento: '));
	if (isNaN(anoN) || anoN < 1920 || anoN > anoAtual) {
		errMensagem('Ano inválido!');
		continue;
	}

	let voto = pedeVoto();
	votacao(autorizaVoto(anoN), voto);

	//Pergunta usuario se quer repetir ou encerrar
	do {
		console.clear();
		console.log('Deseja encerrar a votação?');
		console.log('1 - Novo eleitor \n2 - Encerrar e apurar os votos\n');
		opcao = prompt('Escolha uma opção: ');
		if (opcao != 1 && opcao != 2) {
			errMensagem('Opção inválida!');
			continue;
		}
	} while (opcao != 1 && opcao != 2);
}

exibirResultados();

//------------------ FUNÇÕES ------------------//

// Função que exibe mensagem de Erro
function errMensagem(msg) {
	console.clear();
	console.log(msg);
	prompt('Pressione ENTER para voltar!');
}

// Função que verifica se eleitor pode votar
function autorizaVoto(anoNascimento) {
	let idade = anoAtual - anoNascimento;
	if (idade < 16) {
		return 'Negado';
	} else if (idade >= 18 && idade < 65) {
		return 'Obrigatorio';
	} else {
		return 'Opcional';
	}
}

//Função que solicita opcao de voto
function pedeVoto() {
	let voto;
	do {
		console.clear();
		console.log(`Escolha uma das opções abaixo:

  1 = ${candidatos[0].nome}
  2 = ${candidatos[1].nome}
  3 = ${candidatos[2].nome}
  4 = Voto Nulo
  5 = Voto em Branco
	`);
		voto = parseInt(prompt('Informe seu voto: '));

		if (isNaN(voto) || voto < 1 || voto > 5) {
			errMensagem('Opção inválida!');
		}
	} while (isNaN(voto) || voto < 1 || voto > 5);

	return voto;
}

// Confirmação do voto
function comprovanteVoto(nomeVoto) {
	console.clear();
	console.log('Comprovante de voto: ', nomeVoto);
	prompt('(ENTER)');
}

// Função que valida e contabiliza os votos
function votacao(autorizacao, voto) {
	if (autorizacao == 'Negado') {
		voto = 0;
	}

	switch (voto) {
		case 1:
			comprovanteVoto(candidatos[0].nome);
			candidatos[0].votos++;
			break;
		case 2:
			comprovanteVoto(candidatos[1].nome);
			candidatos[1].votos++;
			break;
		case 3:
			comprovanteVoto(candidatos[2].nome);
			candidatos[2].votos++;
			break;
		case 4:
			comprovanteVoto('Nulo');
			nulos++;
			break;
		case 5:
			comprovanteVoto('Branco');
			brancos++;
			break;
		default:
			errMensagem('Desculpe! Você tem menos de 16 anos \nVocê não pode votar!');
	}
}

//Função exibe resultado da votação
function exibirResultados() {
	//Checa candidato mais votado, e coloca em uma lista caso haja mais de um!
	const maiorVoto = candidatos.sort((a, b) => a.votos - b.votos)[candidatos.length - 1].votos;
	const vencedor = candidatos.filter((a) => a.votos === maiorVoto);

	console.clear();
	console.log('RESULTADO: \n');
	for (const c of candidatos) console.log(`${c.nome} recebeu ${c.votos} votos`);
	console.log('\nQuantidade de votos nulos: ', nulos);
	console.log('Quantidade de votos em branco: ', brancos);
	if (vencedor.length == 1) {
		console.log(`\nO ${vencedor[0].nome} foi eleito com ${vencedor[0].votos} votos!`);
	} else {
		console.log(`\nHaverá 2º turno! \nOs candidatos empataram: `);
		for (const v of vencedor) console.log(`${v.nome}`);
	}
}
