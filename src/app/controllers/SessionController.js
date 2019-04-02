const { User } = require("../models");

class SessionController {
  async create(req, res) {
    return res.render("auth/signin");
  }

  async store(req, res) {
    const { cpf, password } = req.body;

    if (!cpf.trim()) {
      req.flash("error", "Informe seu CPF");
      return res.redirect("/");
    }

    if (!password.trim()) {
      req.flash("error", "Informe sua senha");
      return res.redirect("/");
    }

    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      req.flash("error", "Usuário não encontrado");
      return res.redirect("/");
    }

    if (!(await user.checkPassword(password))) {
      req.flash("error", "Senha incorreta");
      return res.redirect("/");
    }

    req.session.user = user;

    return res.redirect("/app/dashboard");
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie("root");
      return res.redirect("/");
    });
  }
}
module.exports = new SessionController();
