__path = process.cwd()

const axios = require("axios")
const cheerio = require('cheerio')
const yts = require('yt-search'); 
const { ytMp4, ytMp3 } = require(__path + '/lib/y2mate')
var { ytSearch} = require(__path + '/baixar/yt.js')
var { pinterest } = require(__path + '/lib/funções.js')
var { getVideosPlaylist } = require(__path + '/elias-js/playlist.js')
var { LetradaMusica } = require(__path + '/letraMusic.js')
var express = require('express');
var db = require(__path + '/database/db');
var { PlayLinkMP3, PlayLinkMP4, PlayAudio, PlayVideo, ytSearch2 } = require(__path + '/lib/youtubefofs')
try {
var kuhong = db.get('ojan');
} catch (e) {
	console.log('Bem vindo ao Elias Modder Api!') 
}

var criador = `Elias Modder Ofc`
var key = 'elias-modder' 


//*** chaves dessa api ****//

const listkey = ["elias-modder-ofc", "Clover"];

//*****//
var fs = require('fs');
var FormData = require('form-data');
var fetch = require('node-fetch');
var util = require('util');
var { pinterest } = require(__path + '/lib/funções.js');
var { mediafireDl } = require(__path + '/lib/mediafire.js');
var router  = express.Router();


var { spawn, exec } = require('child_process');
var { color, bgcolor } = require(__path + '/lib/color.js');

precisos = {
    digitarapikey: {
        criador : `${criador}`,
        mensage: `digite parâmetro apikey!`
    }
}

async function puxar(url) {
he = await fetch(url).then(c => c.json())
 return he
}

async function getBuffer(url) {
he = await fetch(url)
.then(c => c.buffer())
return he
}

function ttk(query) {
return new Promise(async(resolve,reject) => {
axios.get('https://urlebird.com/pt/user/' + query + '/')
.then(html => {
const pp = cheerio.load(html.data);
let resultado = []
pp(".main").each(function(_,item) {
const nome = pp(item).find("h1").text();
const usernome = pp(item).find("h5").text();
const bio = pp(item).find("p").text();
const likes = pp(item).find(".col-auto").text();
const seguindo = pp(item).find(".d-none").text();
const seguidores = pp(item).find(".col-7").text();
const perfil = pp(item).find("img").attr("src");
const dados = {nome,usernome,bio,likes,seguindo,seguidores,perfil};
resultado.push(dados);
})
resolve({resultado});
}).catch(err => {
reject(err);
})
})
};


router.get('/pinterest', (req, res) => {
(async() => {
var apikey = req.query.apikey;
text = req.query.text
if(!apikey) return res.json(precisos.digitarapikey)
  if(listkey.includes(apikey))
  if (!text) return res.json({ status : false, creator : `@elias-modder`, message : "Cade o parametro text?"})
pin = await pinterest(text)
ac = pin[Math.floor(Math.random() * pin.length)]
res.type('jpg')
res.send(await getBuffer(ac))
})()
})

router.get('/yt-playlist', ApiKeyAut, async(req, res, next) => {
var apikey = req.query.apikey;
url = req.query.url
if(!apikey) return res.json(precisos.digitarapikey)
if(listkey.includes(apikey)){
if (!url) return res.json({ status : false, criador : `@elias-modder`, mensagem : "Coloque o parametro: url"})
getVideosPlaylist(url).then(resJson => {
res.json({
pesquisa: resJson
})}).catch(e => {
res.json({
msg: `Erro no Servidor Interno`
})})
} else {
	res.sendFile(__path + '/views/key.html')
}        	    	 	
})



router.get('/letramusic',  async (req, res, next) => {
var apikey = req.query.apikey
query = req.query.query 
if(!apikey) return res.json(precisos.digitarapikey)
if(listkey.includes(apikey)){
LetradaMusica(query).then(resultado => {
res.json({
criador: `@elias-modder`,
resultado
})
}).catch(e => {
res.json({erro:'Erro no Servidor Interno'})
})
} else {
	res.sendFile(__path + '/views/key.html')
}        	    	 	
})


router.get('/tiktok', async(req, res, next) => {
var apikey = req.query.apikey;
var q = req.query.q;
ttk(q).then(resultado => {
res.json({
status: true,
código: 200,
criador: `Elias Modder`,
perfil: resultado
})}).catch(e => {
console.log(e)
res.json({
msg: `Erro no Servidor Interno`
})})})

router.get('/metadinha', async(req, res, next) => {
  var apikey = req.query.apikey;
  if(!apikey) return res.json(precisos.digitarapikey)
  if(listkey.includes(apikey)){
json = JSON.parse(fs.readFileSync(__path +'/lib/metadinha.json').toString())
         random = json[Math.floor(Math.random() * json.length)]
         
        var garoto = random.masculina;
        var garota = random.feminina;
             res.json({
                 criador : `${criador}`,
                 garoto,
                 garota         
             })      
          
            } else {
	res.sendFile(__path + '/views/key.html')
}        	    	 	
})

router.get('/ytsrc', async(req, res, next) => {
  var apikey = req.query.apikey;
  q = req.query.q
if(!q)return res.json({
status:false,
msg:'Cade o parametro q??'
})
  if(!apikey) return res.json(precisos.digitarapikey)
  if(listkey.includes(apikey)){
ytSearch(q)
.then(e => {
res.json({
status:true,
criador:`${criador}`,
resultado:e
})
})
            } else {
	res.sendFile(__path + '/views/key.html')
}        	    	 	
})


router.get('/mediafire', async (req, res, next) => {
var apikey = req.query.apikey;
url = req.query.url;
if(!apikey)return res.json(precisos.digitarapikey)
  if(!listkey.includes(apikey))
if (!url) return res.json({ status : false, creator : `@elias-modder`, message : "Cade o parametro url?"})
mediafireDl(url)
.then(data => {
var resultado = data;
res.json({
resultado
})
}).catch(e => {
res.json({erro:'Erro no Servidor Interno'})
})
})


router.get('/nome', async (req, res, next) => {
  const nome = req.query.nome;
  const apikey = req.query.apikey;
  
  if (!nome) {
    return res.json({ message: "Coloque o parâmetro: nome", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/nome/${nome}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/telefone', async (req, res, next) => {
  const tel = req.query.tel;
  const apikey = req.query.apikey;
  
  if (!tel) {
    return res.json({ message: "Coloque o parâmetro: tel", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/tel1/${tel}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/telefone2', async (req, res, next) => {
  const tel2 = req.query.tel2;
  const apikey = req.query.apikey;
  
  if (!tel2) {
    return res.json({ message: "Coloque o parâmetro: tel2", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/tel2/${tel2}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/telefone3', async (req, res, next) => {
  const tel3 = req.query.tel3;
  const apikey = req.query.apikey;
  
  if (!tel3) {
    return res.json({ message: "Coloque o parâmetro: tel3", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/tel3/${tel3}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/cpf', async (req, res, next) => {
  const cpf1 = req.query.cpf1;
  const apikey = req.query.apikey;
  
  if (!cpf1) {
    return res.json({ message: "Coloque o parâmetro: cpf1", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/cpf1/${cpf1}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/cpf2', async (req, res, next) => {
  const cpf2 = req.query.cpf2;
  const apikey = req.query.apikey;
  
  if (!cpf2) {
    return res.json({ message: "Coloque o parâmetro: cpf2", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/cpf2/${cpf2}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/cpf3', async (req, res, next) => {
  const cpf3 = req.query.cpf3;
  const apikey = req.query.apikey;
  
  if (!cpf3) {
    return res.json({ message: "Coloque o parâmetro: cpf3", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/cpf3/${cpf3}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/cpf4', async (req, res, next) => {
  const cpf4 = req.query.cpf4;
  const apikey = req.query.apikey;
  
  if (!cpf4) {
    return res.json({ message: "Coloque o parâmetro: cpf4", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/cpf4/${cpf4}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/score', async (req, res, next) => {
  const score = req.query.score;
  const apikey = req.query.apikey;
  
  if (!score) {
    return res.json({ message: "Coloque o parâmetro: score", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/score/${score}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/cnpj', async (req, res, next) => {
  const cnpj = req.query.cnpj;
  const apikey = req.query.apikey;
  
  if (!cnpj) {
    return res.json({ message: "Coloque o parâmetro: cnpj", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/cnpj/${cnpj}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/cep', async (req, res, next) => {
  const cep = req.query.cep;
  const apikey = req.query.apikey;
  
  if (!cep) {
    return res.json({ message: "Coloque o parâmetro: cep", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/cep/${cep}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/vizinhos', async (req, res, next) => {
  const vizinhos = req.query.vizinhos;
  const apikey = req.query.apikey;
  
  if (!vizinhos) {
    return res.json({ message: "Coloque o parâmetro: vizinhos", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/vizinhos/${vizinhos}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/beneficios', async (req, res, next) => {
  const beneficios = req.query.beneficios;
  const apikey = req.query.apikey;
  
  if (!beneficios) {
    return res.json({ message: "Coloque o parâmetro: beneficios", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/beneficios/${beneficios}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/rg', async (req, res, next) => {
  const rg = req.query.rg;
  const apikey = req.query.apikey;
  
  if (!rg) {
    return res.json({ message: "Coloque o parâmetro: rg", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/rg/${rg}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/placa', async (req, res, next) => {
  const placa = req.query.placa;
  const apikey = req.query.apikey;
  
  if (!placa) {
    return res.json({ message: "Coloque o parâmetro: placa", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/placa1/${placa}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/site', async (req, res, next) => {
  const site = req.query.site;
  const apikey = req.query.apikey;
  
  if (!site) {
    return res.json({ message: "Coloque o parâmetro: site", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/site/${site}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})

router.get('/parentes', async (req, res, next) => {
  const parentes = req.query.parentes;
  const apikey = req.query.apikey;
  
  if (!parentes) {
    return res.json({ message: "Coloque o parâmetro: parentes", status: false });
  }
  
  if (listkey.includes(apikey)) {
  
fetch(encodeURI(`https://elias-consultas-ofc-cjm1.onrender.com/parentes/${parentes}`))
    .then(response => response.json())
    .then(dataf => {
      res.json({ criador:`${criador}`, resultado: dataf.resultado.str });
    })
    .catch(error => {
      console.error(error);
      res.json({ message: "Erro na consulta", status: false });
    })
    
} else {
	res.sendFile(__path + '/views/key.html')
}
})


router.get('/montor', async (req, res, next) => {
      var apikey = req.query.apikey;
if(!apikey) return res.json(precisos.digitarapikey)
if(listkey.includes(apikey)){ 
    const Mon = JSON.parse(fs.readFileSync(__path + '/data/montor.json'));
    const randMon = Mon[Math.floor(Math.random() * Mon.length)];
    data = await fetch(randMon).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/montor.jpeg', data)
    res.sendFile(__path + '/tmp/montor.jpeg');
  } else {
  res.sendFile(__path + '/views/key.html')
  }
})

router.get('/anime', async (req, res, next) => {
var apikey = req.query.apikey;
if(!apikey) return res.json(precisos.digitarapikey)
if(listkey.includes(apikey)){ 
    const Wai23 = JSON.parse(fs.readFileSync(__path + '/data/wallhp2.json'));
    const randWai23 = Wai23[Math.floor(Math.random() * Wai23.length)];
    data = await fetch(randWai23).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/wallhp2.jpeg', data)
    res.sendFile(__path + '/tmp/wallhp2.jpeg');
  } else {
  res.sendFile(__path + '/views/key.html')
  }
})


router.get('/mobil', async (req, res, next) => {
      var apikey = req.query.apikey;
if(!apikey) return res.json(precisos.digitarapikey)
if(listkey.includes(apikey)){ 
    const Mob = JSON.parse(fs.readFileSync(__path + '/data/mobil.json'));
    const randMob = Mob[Math.floor(Math.random() * Mob.length)];
    data = await fetch(randMob).then(v => v.buffer());
    await fs.writeFileSync(__path + '/tmp/mobil.jpeg', data)
    res.sendFile(__path + '/tmp/mobil.jpeg');
  } else {
  res.sendFile(__path + '/views/key.html')
  }
})

router.get('/api/dowloader/yt', async(req, res, next) => {
	var url = req.query.url
	var apikey = req.query.apikey;
	if (!url ) return res.json({ status : false, creator : `${criador}`, message : "[!] Falta o Parâmetro Url [!]"}) 

	var mp3 = await ytMp3(url)
	var mp4 = await ytMp4(url)
	if(!apikey) return res.json(precisos.digitarapikey)
if(listkey.includes(apikey))
		res.json({
			status: true,
			creator: `${criador}`,
			result:{ 
			title: mp4.title,
			desc: mp4.desc,
			thum: mp4.thumb,
			view: mp4.views,
			channel: mp4.channel,
			uploadDate: mp4.uploadDate,
			mp4:{
				result: mp4.result,
				size: mp4.size,
				quality: mp4.quality
			},
			mp3:{
				result: mp3.result,
				size: mp3.size
			}
		 }
	   })
})

router.get('/playmp3', async(req, res, next) => {
        var  nome = req.query.nome;
          var apikey = req.query.apikey;
var apikey = req.query.apikey;
if (!nome) return res.json({ status : false, criador : `@elias-modder`, mensagem : "Coloque o parametro: nome"})
if(!apikey) return res.json(precisos.digitarapikey)
if(listkey.includes(apikey)){
PlayAudio(nome).then((resultado) => {
 res.json({
 status: true,
 criador: `${criador}`,
 resultado: resultado
 })}).catch(e => {
 console.log(e)
res.json({
 msg: `Erro no Servidor Interno`
 })})
 } else {
  res.sendFile(__path + '/views/key.html')
  }
})

module.exports = router