const { User } = require("../models");

class UserController {
  create(req, res) {
    return res.render("auth/signup");
  }

  async store(req, res) {
    const { filename: avatar } = req.file;

    await User.create({ ...req.body, avatar });

    return res.redirect("/");
  }

  profile(req, res) {
    const user = {
      id: req.session.user.id,
      name: req.session.user.name
    };

    return res.render("_layouts/profile", { user });
  }

  async updatePassword(req, res, next) {
    console.log("* UPDATE PASSWORD *");
    try {
      const user = User.findById(req.params.id);
      const { password, password2, password3 } = req.body;
      // if (password2 != password3) {
      //   req.flash("error", "As novas senhas estão diferentes");
      //   console.log("As novas senhas estão diferentes");
      //   return res.redirect("/app/profile");
      // }

      console.log(req.body.password);

      // await user.update(req.body);

      // req.flash("success", "Senha alterada com sucesso!");

      // res.redirect("/app/dashboard");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
