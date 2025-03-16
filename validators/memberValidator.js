const { body } = require('express-validator');

const registerValidator = [
  body('email')
    .isString().withMessage('문자열이 아닙니다.')
    // .isLength({ min: 3, max: 20}).withMessage('아이디는 3~20자 사이여야 합니다.')
    // .matches(/^[a-zA-Z][a-zA-Z0-9_.]*$/).withMessage('아이디는 영문자로 시작하고, 영문, 숫자, 밑줄(_), 점(.)만 사용할 수 있습니다.')
    ,
  
  body('password')
    .isString().withMessage('문자열이 아닙니다.')
    // .isLength({ min: 8, max: 30}).withMessage('비밀번호는 8~30자 사이여야 합니다.')
    // .matches(/^(?=.*[A-Za-z])(?=.*\d|.*[^A-Za-z0-9]).{8,}$/).withMessage('비밀번호는 영문 + 숫자 또는 특수문자의 조합이어야 합니다.')
    .not().matches(/\s/).withMessage('비밀번호에 공백을 포함할 수 없습니다.'),

  body('name')
    .isString().withMessage('문자열이 아닙니다.')
    .isLength({ min: 2, max: 20}).withMessage('이름은 2~20자 사이여야 합니다.')
    .matches(/^[a-zA-Z가-힣]+(?: [a-zA-Z가-힣]+)*$/).withMessage('이름에는 한글, 영문, 공백만 사용할 수 있으며, 공백은 허용되지 않습니다.')
];

const loginValidator = [
  body('email')
    .isString().withMessage('문자열이 아닙니다.')
    .notEmpty().withMessage('아이디를 입력하세요.'),
  
  body('password')
    .isString().withMessage('문자열이 아닙니다.')
    .notEmpty().withMessage('비밀번호를 입력하세요.')
];

module.exports = { registerValidator, loginValidator };
