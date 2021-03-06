'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

//Gets all users from database
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

//Adds a new user to the database
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

//Gets user for login
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

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  getUserLogin,
};