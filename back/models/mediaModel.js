'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllMediaPost = async () => {
  try {

    const [rows] = await promisePool.execute('SELECT proj_mediafeed.id, proj_mediafeed.classid, userid, mediafilename, mediadesc, proj_mediafeed.VST, proj_user.username AS username FROM proj_mediafeed LEFT JOIN proj_user ON userid = proj_user.id');
    return rows;
  } catch (e) {
    console.error('mediaModel:', e.message);
  }
};

const getMediaPost = async (id) => {
  try {
    console.log('mediaModel getMedia', id);
    const [rows] = await promisePool.execute('SELECT * FROM proj_mediafeed WHERE id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const insertMediaPost = async (req) => {
  try {
    console.log(req.user.classid + req.user.id + req.file.filename + req.body.description);
    const [rows] = await promisePool.execute('INSERT INTO proj_mediafeed (classid, userid, mediafilename, mediadesc, VST) VALUES (? , ?, ?, ?, NOW())',
        [req.user.classid, req.user.id, req.file.filename, req.body.description]);
    console.log('mediaModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.log('erroroium' + req);
    console.error('insertMediaPost:', e.message);
    throw new Error('insertMediaPost failed');
  }
};

const updateMediaPost = async (id, req) => {
  try {
    const [rows] = await promisePool.execute('UPDATE proj_mediafeed SET classid = ?, userid = ?, mediadesc = ? WHERE id = ? AND VST = ?;',
        [req.body.classid, req.body.userid, req.body.description, id]);
    console.log('mediaModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

module.exports = {
  insertMediaPost,
  getMediaPost,
  getAllMediaPost
};