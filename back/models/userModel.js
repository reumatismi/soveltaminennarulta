'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM proj_user');
    return rows;
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

const getUser = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.execute(
        'SELECT * FROM proj_user WHERE id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

const insertUser = async (req) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO proj_user (username, firstname, lastname, role, classid, password, VST) VALUES (?, ?, ?, ?, ?, ?, CURDATE());',
        [req.username, req.firstname, req.lastname, req.role, req.classid, req.password]);
    console.log('userModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('userModel insertUser:', e);
    return 0;
  }
};

const updateUser = async (id, req) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE proj_user SET username = ?, firstname = ?, lastname = ?, role = ?, classid = ? WHERE id = ?;',
        [req.body.username, req.body.firstname, req.body.lastname, req.body.role, req.classid]);
    console.log('userModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM proj_user WHERE username = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

//TODO: delete function. Consider no return needed? just best effort...

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  getUserLogin,
};