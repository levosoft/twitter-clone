/**
 * session alapján ellenőrzi hogy felhasználó be van-e lépve, ha nincs átirányítja a főoldalra,
 * különben nextet hív
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  return (req, res, next) => {
    if (typeof req.session.userid === "undefined") {
      return res.redirect("/");
    }
    return next();
  };
};
