const { User } = require("../models");
const bcrypt = require("bcrypt");

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
    try {
      const { id } = req.session.user;
      console.log("ID: " + id);
      const userModel = new User();
      let user = await User.findByPk(id);
      const { password, password1, password2 } = req.body;
      user = user.toJSON();

      console.log("-- - -- -- -- -- --- --- ");
      console.log("User: ", user.name);
      console.log("Password: ", user.password_hash);
      console.log("-- - -- -- -- -- --- --- ");

      console.log("PASSWORD: " + password);
      console.log("PASSWORD1: " + password1);
      console.log("PASSWORD2: " + password2);

      console.log("-- - -- -- -- -- --- --- ");

      const password_hash = await bcrypt.hash(password, 8);
      const password_hash2 = await bcrypt.hash(password1, 8);
      const password_hash3 = await bcrypt.hash(password2, 8);

      console.log("- - - - ");
      console.log("PASSWORD_HASH: " + password_hash);
      console.log("USER_PASSWORD_HASH: " + user.password_hash);
      console.log("- - - - ");

      if (bcrypt.compare(password_hash, user.password_hash)) {
        console.log("Senhas Iguais");
      } else {
        console.log("Senhas não iguais");
      }

      // if (!(await userModel.checkPassword(password))) {
      //   req.flash("error", "Senha já usada anteriormente");
      //   return res.redirect("/");
      // }

      // if (password2 != password3) {
      //   req.flash("error", "As novas senhas estão diferentes");
      //   console.log("As novas senhas estão diferentes");
      //   return res.redirect("/app/profile");
      // }

      // await user.update(req.body);
      // req.flash("success", "Senha alterada com sucesso!");
      // res.redirect("/app/dashboard");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
