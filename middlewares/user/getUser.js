/**
 * kinyeri a belépett felhasználó adatait és a res.locals.user-re
 * rakja rá ezt
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { userModel } = objRepo;
  return (req, res, next) => {
    const user = userModel.findOne({
      id: req.session.userid,
    });
    if (!user) {
      return next(new Error("User from session does not exist."));
    }
    res.locals.user = user;
    return next();
  };
};
