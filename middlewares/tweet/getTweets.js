/**
 * tweet-ek listájának kinyerése
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { tweetModel } = objRepo;
  return (req, res, next) => {
    res.locals.tweets = tweetModel.find({
      visibility: "public",
    });
    return next();
  };
};
