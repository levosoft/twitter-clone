/**
 * Render ejs
 * @param objRepo
 * @param view
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo, view) {
  return async (req, res, next) => {
    return res.render(view, res.locals);
  };
};
