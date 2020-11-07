const express = require("express"),
  router = express.Router(),
  Account = require("../models/Account");

router.post("/new-account", (req, res) => {
  Account.create(req.body, (err, newAccount) => {
    if (err) {
      return res.json({ err: true, msg: "Account was not created" });
    }
    console.log(newAccount);
    return res.json(newAccount);
  });
});

module.exports = router;
