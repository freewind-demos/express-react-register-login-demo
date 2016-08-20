'use strict';
import express from 'express';
import _ from 'lodash';
import sha1 from 'sha1';
const router = express.Router();

const users = [];
router.post('/users', function (req, res) {
  users.push(req.body);
  res.sendStatus(201);
});

router.post('/sessions', function (req, res) {
  const {username, password} = req.body;
  const existUser = _.find(users, {username, password});
  if (existUser) {
    res.cookie('token', generateToken(username, password));
    res.sendStatus(201);
  } else {
    res.sendStatus(401);
  }
});

router.get('/personal', function (req, res) {
  const token = req.cookies['token'];
  if (validateToken(token)) {
    const username = getUsernameFromToken(token);
    return res.json({username, greeting: 'Hello, logged user!'});
  }
  res.sendStatus(401);
});

function generateToken(username, password) {
  return username + ':' + sha1(password);
}

function getUsernameFromToken(token) {
  const separatorIndex = _.lastIndexOf(token, ':');
  return token.substring(0, separatorIndex);
}

function validateToken(token) {
  if (token === null || token.length === 0 || !token.includes(':')) {
    return false;
  }
  const username = getUsernameFromToken(token);
  const user = findUser(username);
  if (user) {
    const {password} = user;
    return generateToken(username, password) === token;
  }
  return false;
}

function findUser(username) {
  return _.find(users, {username});
}

export default router;