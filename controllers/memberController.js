const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const db = require('../database/connect/mariadb');
const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;


/** JWT 생성 */
const generateToken = (user) => {
  return jwt.sign({
    email: user.email,
    name: user.name
  }, jwtPrivateKey, {
    expiresIn: '30m'
  });
};

/** 회원 가입 */
const registerMember = (req, res) => {
  const { email, password, name } = req.body;

  const insertQuery = 'insert into member (email, password, name) values (?, ?, ?)';
  const values = [email, password, name];

  db.query(insertQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }
    
    if (!results.affectedRows) {
      res.status(500).json({
        message: '회원 가입에 실패했습니다.'
      });
    } else {
      res.status(201).json({
        message: `${name}님, 회원 가입에 성공했습니다.`
      });
    }
  });
};

/** 로그인 */
const loginMember = (req, res) => {
  const { email, password } = req.body;

  const query = 'select * from member where email = ?';
  const values = [email];

  db.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }

    const loginUser = results[0];

    if (loginUser && loginUser.password === password) {
      const token = generateToken(loginUser);

      res.cookie('token', token, {
        httpOnly: true
      });

      return res.status(200).json({
        message: '로그인 성공'
      });
    }

    return res.status(403).json({
      message: '아이디 또는 비밀번호가 틀렸습니다.'
    });
  });
};

module.exports = { registerMember, loginMember };
