const dtbFct = require('./dtb');
const objCreator = require('../middlewares/objectCreator')
const tagClass = require('../models/tag');

exports.getOneTag = async (reqTag) => {
  let resTag;
  await dtbFct.selectTag(reqTag)
    .then(dtbTag => {
      resTag = objCreator.createObj(tagClass, dtbTag)
    })
  return resTag
};

exports.postTag = async (reqTag) => {
  let resTag;
  if (reqTag.id) {
    resTag = await this.modifTag(reqTag)
  } else {
    await dtbFct.createTag(reqTag)
      .then((newTag) => {
        resTag = objCreator.createObj(tagClass, newTag);
      })
  }
  return resTag
};

exports.modifTag = async (reqTag) => {
  let resTag;
  await dtbFct.updateTag(reqTag)
    .then(() => {
      resTag = this.getOneTag(reqTag)
    })
  return resTag
};
