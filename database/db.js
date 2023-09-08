var __path = process.cwd(),
      monk = require('monk'),
     { color } = require(__path + '/lib/color.js')

// Connection URL
var url = 'https://supraz.herokuapp.com';
try {
if(url == 'https://supraz.herokuapp.com') throw console.log(color('Verifique a configuração do banco de dados, var url não foi preenchido','red'));
} catch (e) {
	return;
	}
var db = monk(url);

db.then(() => {
  console.log(color('Conectado corretamente ao servidor, Supra-API','green'))
})
.catch ((e) => {
	console.log(color('Error : '+ e +'\n\nFalha ao conectar ao banco de dados, \nverifique a configuração do banco de dados se a URL de conexão está correta','red'))
	})


module.exports = db
