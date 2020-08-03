/* 
  0 - Obter dados do usuario
  1 - Obter o numero de telefone do usuário pelo ID
  2 - Obter o endereço do usuário pelo ID 
 */
//Importanto um módulo interno
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  //Quando der algum problema -> reject(erro)
  //Quando tudo for sucesso -> resolv

  return new Promise(function resolvePromise(resolve, reject) {
    /* Simulação da busca no servidor */
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '94039880',
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: ' dos bobos',
      numero: 0,
    });
  }, 2000);
}

//UTILIZANDO ASSYNC

async function main() {
  try {
    const usuario = await obterUsuario();
    const telefone = await obterTelefone(usuario.id);
    const endereco = await obterEnderecoAsync(usuario.id);

    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) - ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `);
  } catch (error) {
    console.error('DEU RUIM!', error);
  }
}

main();

//SOlução com promisse
/* const usuarioPromisse = obterUsuario();
//Quando da tudo certo .then
//Quando da errado .catch
usuarioPromisse
  .then(function (usuario) {
    return obterTelefone(usuario.id)
      .then(function resolverTelefone(result) {
        return {
          usuario: {
            nome: usuario.nome,
            id: usuario.id,
          },
          telefone: result,
        };
      })
      .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result) {
          return {
            usuario: resultado.usuario,
            telefone: resultado.telefone,
            endereco: result,
          };
        });
      });
  }) */
/*   .then(function (resultado) {
    console.log('resultado', resultado);
  })
  .catch(function (error) {
    console.log('DEU RUIM', error);
  }); */
//Solução com callback
/* Dados recebidos da API */
/* obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.log('DEU RUIM em USUARIO ', error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.log('DEU RUIM em TELEFONE ', error);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.log('DEU RUIM no ENDEREÇO', error);
        return;
      }
      console.log(`
      Nome: ${usuario.nome},
      Endereço: ${endereco.rua}, ${endereco.numero}
      Telefone: (${telefone.ddd})${telefone.telefone}
      
      `);
    });
  });
}); */
