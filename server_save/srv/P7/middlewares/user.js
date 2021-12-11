const groupomania = require('./groupomania');
const gpm = require('../middlewares/gpm');
const bcrypt = require('bcrypt');

exports.createUser = (data) => {
  return gpm.checkDept(data)
  .then(() => {
    return groupomania.call('sign_up', data.nom, data.prenom, data.email, data.password, data.departement)
  })
};

exports.selectProfil = async (data) => {
  let profil;

  await groupomania.call('log_in', data.email)
  .then((res) => {
    return profil = res[0]
  })
  .then(() => {
    return bcrypt.compare(data.verifPass, profil.password)
  })
  .then((valid) => {
    if (!valid) {
      throw { custMsg : 'Mot de passe incorrect >:(' }
    }
  })
  return profil
};

exports.putInfos = async (data) => {
  let profil;

  await gpm.checkDept(data)
  .then(() => {
    return this.selectProfil(data)
  })
  .then(() => {
    return groupomania.call('modif_user_infos', data.nom, data.prenom, data.departement, data.id)
    .then(res => {
      return profil = res[0]
    })
  })
  return profil
};

exports.putEmail = (data) => {
  return this.selectProfil(data)
  .then(() => {
    return groupomania.call('modif_user_email', data.emailNew, data.id)
  })
};

exports.putPass = (data) => {
  return this.selectProfil(data)
  .then(() => {
    return groupomania.call('modif_user_pass', data.passwordNew, data.id)
  })
};

exports.delete = (data) => {
  return this.selectProfil(data)
  .then(() => {
    return groupomania.call('delete_user', data.id)
  })
};