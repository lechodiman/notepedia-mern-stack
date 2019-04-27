const user = require("./api/user");
const article = require("./api/article");

module.exports = router => {
  user(router);
  article(router);
};
