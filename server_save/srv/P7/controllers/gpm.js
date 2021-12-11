const gpm = require('../middlewares/gpm');
const fs = require('fs');
const { cryptData, decryptData } = require('../middlewares/sanitizer');

let fctMap = [
  {route: '/depts', fct: 'DeptsList'},
  {route: '/lastAnnonce', fct: 'LastAnnonce'},
  {route: '/lastArticles', fct: 'LastArticles'},
// Groupes
  {route: '/groupeList', fct: 'GroupeList'},
  {route: '/groupe/:groupe', fct: 'Groupe'},
  {route: '/groupe/create', fct: 'Groupe'},
  {route: '/groupe/:groupe/member', fct: 'GroupeMember'},
  {route: '/groupe/:groupe/commSignaled', fct: 'GroupeCommSignaled'},
  {route: '/groupe/grant', fct: 'Groupe'},
// Participations
  {route: '/participation/:participationId', fct: 'Participation'},
  {route: '/participation/create', fct: 'Participation'},
  {route: '/participation/:participationId/member', fct: 'ParticipationMember'},
  {route: '/participation/:participationId/grant', fct: 'ParticipationMember'},
// Commentaires
  {route: '/participation/:participationId/commentaire', fct: 'ParticipationComment'},
  {route: '/commentaire/signal', fct: 'SignalComment'},
];

exports.setFct = (req, res, next) => { // Imposible de définir dynamiquement la gpm.fct sans passer par le req (la callback du router doit avoir les arguments (req, res, next) et RIEN d'autre, gpm.sendIt('ma fct') ne marche pas)
  let params = { ...req.params };
  let path = req.path.split('/');
  let route = '';
  if (Object.entries(params).length > 0) {
    for (const [key, value] of Object.entries(params)) {
      path.forEach(el => {
        if (value === decodeURIComponent(el)) route = route + '/:' + key
        else if (el !== '') route = route + '/' + el;
      })
    }
  } else {
    route = req.path
  };

  for (let pair of fctMap) {
    if (route === pair.route) {
      req['fct'] = req.method.toLowerCase() + pair.fct
    }
  };
// exe --> API appelée = methode GET sur route '/depts' ==> GPMfct = 'getDeptsList'
  next();
};

exports.sendIt = async (req, res) => {
  await cryptData(req)
  .then((data) => {
    return gpm[req.fct](data)
  })
  .then(async (data) => {
    if (!data) { // Pas de contenu = objet créé
      res.sendStatus(201)
    }
    else {
      data = await decryptData(data);
      res.send(data)
    }
  })
  .then(() => {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (err) => {
        return console.log(err)
      })
    }
  })
  .catch((error) => {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        return console.log(err)
      })
    }
    console.log(error);
    res.status(500).json(error.custMsg)
  })
};