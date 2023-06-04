/**
 * ellenőrzi, hogy létezik-e ez az email cím a rendszerben, ha igen, akkor az elfelejtett jelszó kérése screenre
 * irányít, ha nem, akkor beregisztrálja a felhasználót
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { userModel, uuid, saveDB } = objRepo;
  return (req, res, next) => {
    if (
      typeof req.body.email === "undefined" ||
      typeof req.body.password === "undefined"
    ) {
      return next();
    }
    console.log(req.body);
    try {
      userModel.insert({
        id: uuid.v4(),
        email: req.body.email,
        password: req.body.password,
        name: {
          lastName: req.body.name.lastName,
          firstName: req.body.name.firstName,
          nickName: req.body.name.nickName,
        },
        age: parseInt(req.body.age),
        gender: parseInt(req.body.gender),
        avatar: req.body.avatar,
        following: [],
        followers: [],
      });
    } catch (err) {
      console.log(err);
      return res.redirect("/regerr");
    }

    return saveDB(next);
  };
};
