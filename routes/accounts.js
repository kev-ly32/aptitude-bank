const express = require("express"),
  router = express.Router(),
  Account = require("../models/Account");

router.get("/accounts/:userID", (req, res) => {
  const userID = req.params.userID;
  Account.find({ userID }, (err, accounts) => {
    if (err) {
      return res.json({ err: true, msg: "Error finding accounts" });
    }
    console.log(accounts);
    return res.json(accounts);
  });
});

router.post("/new-account", (req, res) => {
  Account.create(req.body, (err, newAccount) => {
    if (err) {
      return res.json({ err: true, msg: "Account was not created" });
    }
    return res.json(newAccount);
  });
});

module.exports = router;
