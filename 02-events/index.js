const EventEmitter = require('events');
class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuário: Click';

meuEmissor.on(nomeEvento, function (click) {
  console.log('Um usuario clicou', click);
});

meuEmissor.emit(nomeEvento, 'Na barra de rolagem');
meuEmissor.emit(nomeEvento, 'no OK');
