const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jsonwebtoken = require('jsonwebtoken');

const generateJwt = (id, email) =>
  jsonwebtoken.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password)
      return next(ApiError.badRequest('Неправильный логин или пароль'));
    const candidat = await User.findOne({ where: { email } });
    if (candidat)
      return next(
        ApiError.badRequest('Пользователь с таким email уже существует')
      );
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      password: hashPassword,
      scores: [0],
    });
    const jwt = generateJwt(user.id, user.email);
    return res.json({ jwt });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return next(ApiError.internal('Пользователь не найден'));
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      return next(ApiError.internal('Указан неверный пароль'));
    const userId = user.id;
    const token = generateJwt(user.id, user.email);
    return res.json({ token, userId });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.json(token);
  }

  async getAllScores(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async sendScore(req, res) {
    const { scores, id } = req.body;
    let user = await User.findOne({ where: { id } });
    user.update({
      ['scores']: [...user.scores, ...scores],
    });
    return res.json(user);
  }

  async getUserInfoById(req, res) {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
    });
    return res.json(user);
  }
}

module.exports = new UserController();
