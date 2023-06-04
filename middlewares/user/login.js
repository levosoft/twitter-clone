/**
 * beléptetés (session + db ellenőrzést)
 *  ha sikeres a belépés irányítsunk a /profile oldalra
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { userModel } = objRepo;

  return (req, res, next) => {
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined"
    ) {
      return next();
    }
    const user = userModel.findOne({
      email: req.body.email.trim().toLowerCase(),
      password: req.body.password,
    });

    if (!user) {
      console.log("Hibás email vagy jelszó!");
      res.locals.errors = res.locals.errors || [];
      res.locals.errors.push("Hibás email vagy jelszó!");
      return next();
    }

    req.session.userid = user.id;
    return req.session.save((err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/profile");
    });
  };
};
