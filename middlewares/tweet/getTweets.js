/**
 * tweet-ek listájának kinyerése
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { tweetModel, userModel } = objRepo;
  return async (req, res, next) => {
    const tweets = tweetModel.chain().find({}).simplesort("date", true).data();
    const tweetsWithUsers = [];

    for (const tweet of tweets) {
      const user = await userModel.findOne({ id: tweet.userId });
      if (user) {
        const tweetWithUser = {
          ...tweet,
          user: user,
          isCurrentUserTweet: user.id === req.session.userId,
        };
        tweetsWithUsers.push(tweetWithUser);
      }
    }

    res.locals.tweets = tweetsWithUsers;

    return next();
  };
};
