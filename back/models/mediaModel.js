'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllMediaPost = async (filter = 0) => {
  try {

    const [rows] = await promisePool.execute(`SELECT proj_mediafeed.id, proj_mediafeed.classid, userid, mediafilename, mediadesc, visibility, proj_mediafeed.vst, proj_user.username FROM proj_mediafeed LEFT JOIN proj_user ON userid = proj_user.id WHERE proj_mediafeed.vet IS NULL AND visibility >= ? ORDER BY vst DESC`, [filter]);
    return rows;
  } catch (e) {
    console.error('mediaModel:', e.message);
  }
};

const getMediaPost = async (id) => {
  try {
    console.log('mediaModel getMedia', id);
    const [rows] = await promisePool.execute('SELECT * FROM proj_mediafeed WHERE id = ?;', [id]);
    return rows[0];
  } catch (e) {
    console.error('mediaModel:', e.message);
  }
};

const insertMediaPost = async (req) => {
  try {
    console.log(req.user.classid + req.user.id + req.file.filename + req.body.description);
    const [rows] = await promisePool.execute('INSERT INTO proj_mediafeed (classid, userid, mediafilename, mediadesc, visibility, VST) VALUES (? , ?, ?, ?, ?, NOW())',
        [req.user.classid, req.user.id, req.file.filename, req.body.description, req.user.role]);
    console.log('mediaModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.log('erroroium' + req);
    console.error('insertMediaPost:', e.message);
    throw new Error('insertMediaPost failed');
  }
};

const updateMediaPost = async (req) => {
  try {
//    console.log(req.visibility + ' ' + req.id);
    const [rows] = await promisePool.execute('UPDATE proj_mediafeed SET visibility = ? WHERE id = ?;',
        [req.visibility, req.id]);
    console.log('mediaModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

const deleteMediaPost = async (id) => {
  try {
    console.log('mediaModel deleteMediaPost', id);
    const [rows] = await promisePool.execute('UPDATE proj_mediafeed SET vet = NOW() WHERE proj_mediafeed.id = ?',
    [id]);
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('mediaModel:', e.message);
  }
};

module.exports = {
  insertMediaPost,
  getMediaPost,
  getAllMediaPost,
  updateMediaPost,
  deleteMediaPost
};