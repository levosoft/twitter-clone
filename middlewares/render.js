/**
 * Render ejs
 * @param objRepo
 * @param view
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo, view) {
  return (req, res, next) => {
    return res.render(view, res.locals);
  };
};
