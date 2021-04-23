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
        'SELECT * FROM proj_user WHERE ID = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

const insertUser = async (req) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO proj_user (UName, FName, LName, Role, ClassID, Password, VST) VALUES (?, ?, ?, ?, ?, ?, CURDATE());',
        [req.username, req.fname, req.lname, req.role, req.classid, req.password]);
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
        'UPDATE proj_user SET IDNo = ?, UName = ?, FName = ?, LName = ?, Role = ?, ClassID = ? WHERE user_id = ?;',
        [req.body.name, req.body.username, req.body.first_name, req.body.last_name, req.body.role, req.body.class, req.body. id]);
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
        'SELECT * FROM proj_user WHERE UName = ?;',
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