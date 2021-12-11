const groupomania = require('./groupomania');
const fs = require('fs');
const { encrypt, decrypt } = require('../middlewares/crypto');

exports.verifRight = async (identifier, userId) => {
  let acces;

  await this.verifAdmin(identifier, userId)
  .then(async (res) => {
    if (res == 1) return acces = 1
    else {
      let publique = 0;
      let member = 0;
      let prive = 0;
    // identifier = idparticipation ou groupeName = clause pour WHERE
      let table = Number.isInteger(identifier) ? 'participation' : 'groupe';
      let column = Number.isInteger(identifier) ? 'id' : 'nom';
    
      await groupomania.connect
      .then(function () { // user = membre ?
        return session.sql('SELECT COUNT(*) FROM utilisateur_' + table + ' WHERE ' + table + '_' + column + ' = \'' + identifier + '\' AND utilisateur_id = ' + userId + ';')
        .execute((row) => { member = row[0] })
      })
      .then(function () { // publique ?
        if (member === 0) {
          return session.sql('SELECT publique FROM ' + table + ' WHERE ' + column + ' = \'' + identifier + '\';')
          .execute((row) => { publique = row[0] })    
        }
      })
      .then(function () { // privé ?
        if ((member + publique) === 0 && (table === 'participation')) {
          return session.sql('SELECT prive FROM participation WHERE id = \'' + identifier + '\';')
          .execute((row) => { prive = row[0] })
        }
      })
      .catch((error) => {
        console.log(error);
        throw { custMsg : 'Problème lors de la vérification des droits.' }
      })
    
      acces = (publique + member - prive);
      if (acces === -1) { // => participation privée et user non membre = non visible
        throw { custMsg : 'Vous n\'avez pas les droits.' }
      }
    }
  })
  return acces
  // 0 => visible, non membre
  // 1 ou 2 => membre, peut participer
};

exports.verifAdmin = async (identifier, userId) => {
  let admin = 0;

  let table = Number.isInteger(identifier) ? 'participation' : 'groupe';
  let column = Number.isInteger(identifier) ? 'id' : 'nom';

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT admin FROM utilisateur_' + table + ' WHERE ' + table + '_' + column + ' = \'' + identifier + '\' AND utilisateur_id = ' + userId + ';')
    .execute((row) => { admin = row[0] })
  })
  .catch((error) => {
    console.log(error);
    throw { custMsg : 'Problème lors de la vérification des droits d\'admin.' }
  })
  return admin
};

exports.getDeptsList = async () => {
  let dept = [];

  await groupomania.connect
  .then(function () {
    return session.sql('SELECT nom FROM departement;')
    .execute((row) => {
        row.forEach(nom => {
          dept.push(nom)
        })
      })
    }
  )
  .catch(() => {
    throw { custMsg : 'Problème lors de la récupération des départements.' }
  })
  return dept
};

exports.checkDept = (data) => {
  let departement = data.departement;

  return this.getDeptsList()
  .then((depts) => { // Check de l'input departement
    let match = false;
    depts.forEach((dept) => {
      if (encrypt(dept) === encrypt(departement)) {
        match = true;
        return departement = dept;
      }
    });
    if (!match) {
      throw { custMsg : ' !! dept ne correspond pas !! ' }
    }
  })
};

exports.getLastAnnonce = () => {
  return groupomania.call('last_annonce')
  .then((row) => {
    return row[0]
  })
};

exports.getLastArticles = async () => {
  let content = [];
  await groupomania.call('last_articles')
  .then((row) => {
    row.forEach(part => {
      content.push(part)
    })
  })
  return content;
};

exports.getGroupeList = async () => {
  let groupeList = [];
  await groupomania.connect
  .then(() => {
    return session.sql('SELECT JSON_OBJECT(\'nom\', nom, \'description\', description) FROM groupe;')
    .execute((row) => {
        row.forEach(groupe => {
          groupeList.push(groupe)
        })
      }
    )
  })
  .catch(() => {
    throw { custMsg : 'Problème lors de la récupération des groupes.' }
  })
  return groupeList;
};

// Groupes

exports.getGroupe = async (data) => {
  let content = [];
  await groupomania.call('groupe_content', data.groupe)
  .then((row) => {
    row.forEach(part => {
      content.push(part)
    })
  })
  return content;
};

exports.postGroupe = async (data) => {
  // Input checkbox to boolean
  data.image ? data.image = 1 : data.image = 0;
  data.publique ? data.publique = 1 : data.publique = 0;

  await groupomania.call('create_groupe', data.groupe, data.description, data.id, data.publique);

  let name = encodeURIComponent(decrypt(data.groupe)).toString();

  if (data.image) fs.rename(data.file.path, 'images/groupes/' + name.replace(/%|~/g, '') + '.webp', (err) => { 
    if (err) {
      console.log(err)
      fs.unlink(data.file.path, (err) => { if (err) console.log(err) })
    }
  })
};

exports.getGroupeMember = async (data) => {
  let content = [];
  await groupomania.call('groupe_member', data.groupe)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;    
};

exports.getGroupeCommSignaled = async (data) => {
  let content = [];
  await this.verifAdmin(data.groupe, data.id);
  await groupomania.call('groupe_comm_signaled', data.groupe)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;
};

exports.putGroupeMember = async (data) => {
  await this.verifAdmin(data.groupe, data.id);
  await groupomania.call('grant_groupe_right', data.groupe, data.id, data.idNewMember, data.newAdmin)
};

exports.deleteGroupe = async (data) => {
  await this.verifAdmin(data.idParticipation, data.id)
  await groupomania.call('delete_groupe', data.groupe)

  fs.unlink('images/groupes/' + data.groupe + '.webp', (err) => { if (err) console.log(err) })
};


// Participations

exports.getParticipation = async (data) => {
  let content = [];
  await this.verifRight(data.groupe, data.id);
  await groupomania.call('participation_infos', data.idParticipation)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;
};

exports.postParticipation = async (data) => {
  // Input checkbox to boolean
  data.image ? data.image = 1 : data.image = 0;
  data.publique ? data.publique = 1 : data.publique = 0;
  data.prive ? data.prive = 1 : data.prive = 0;
  data.importance ? data.importance = 100 : data.importance = 0;

  if ((data.publique + data.prive) === 2) {
    throw { custMsg: "Une participation ne peut être publique et privée !" }
  }
  await this.verifRight(data.groupe, data.id)
  .then((res) => {
    if (res < 1) throw { custMsg : 'Vous n\'avez pas le droit de créer une participation.' }
  })
  await groupomania.call('create_participation', data.groupe, data.id, data.titre, data.preview, data.article, data.importance, data.publique, data.prive)
  .then((row) => {
    data['idPart'] = row
  })

  if (data.image) fs.rename(data.file.path, 'images/participations/' + data.idPart + '.webp', (err) => {
    if (err) {
      console.log(err)
      fs.unlink(data.file.path, (err) => { if (err) console.log(err) })
    }
  })
};

exports.getParticipationMember = async (data) => {
  let content = [];
  await groupomania.call('participation_member', data.idParticipation)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })
  return content;
};

exports.putParticipationMember = async (data) => {
  await this.verifAdmin(data.idParticipation, data.id);
  await groupomania.call('grant_participation_right', data.idParticipation, data.id, data.idNewMember, data.newAdmin)  
};

exports.deleteParticipation = async (data) => {
  await this.verifAdmin(data.idParticipation, data.id)
  await groupomania.call('delete_participation', data.idComm)

  fs.unlink('images/participations/' + data.idParticipation + '.webp', (err) => { if (err) console.log(err) })
};

// Commentaires

exports.getParticipationComment = async (data) => {
  let content = [];
  await this.verifRight(data.idParticipation, data.id);
  await groupomania.call('participation_comment', data.idParticipation)
  .then((row) => {
    row.forEach(el => {
      content.push(el)
    })
  })

  content.sort((a, b) => { // réarragement par id des comms (plus anciens > plus récent)
    return a.id - b.id
  })

  return content;
};

exports.putSignalComment = async (data) => {
  data.signal ? data.signal = 1 : data.signal = 0;

  await this.verifRight(data.idParticipation, data.id);
  await session.sql('UPDATE commentaire SET signaled = ' + data.signal + ' WHERE id = ' + data.idComm + ';')
  .execute()
};

exports.postParticipationComment = async (data) => {
  // Input checkbox to boolean
  data.image ? data.image = 1 : data.image = 0;

  await this.verifRight(data.idParticipation, data.id)
  .then((res) => {
    if (res < 1) throw { custMsg : 'Vous n\'avez pas le droit de participer.' }
  })
  await groupomania.call('create_commentaire', data.id, data.idParticipation, data.contenu, data.image)
  .then((row) => {
    data['idComm'] = row
  })

  if (data.image) fs.rename(data.file.path, 'images/commentaires/' + data.idComm + '.webp', (err) => {
    if (err) {
      console.log(err)
      fs.unlink(data.file.path, (err) => { if (err) console.log(err) })
    }
  })
};

exports.deleteParticipationComment = async (data) => {
  await this.verifRight(data.idParticipation, data.id)
  .then((res) => {
    if (res < 1 && (data.id !== data.idCreateur)) throw { custMsg : 'Vous n\'avez pas les droits' }
  })
  await groupomania.call('delete_commentaire', data.idComm)

  fs.unlink('images/commentaires/' + data.idComm + '.webp', (err) => { if (err) console.log(err) })
};