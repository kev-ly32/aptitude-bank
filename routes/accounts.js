const express = require("express"),
  router = express.Router(),
  Account = require("../models/Account");

router.get("/accounts/:userID", (req, res) => {
  const userID = req.params.userID;
  Account.find({ userID }, (err, accounts) => {
    if (err) {
      return res.json({ err: true, msg: "Error finding accounts" });
    }
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

router.put("/deposit", (req, res) => {
  const { balance, id } = req.body;
  console.log(balance, id);
  Account.findOneAndUpdate(
    { _id: id },
    { $inc: { balance } },
    { new: true },
    (err, updatedBalance) => {
      if (err) {
        console.log(err);
        res.json({ error: "Balance was not updated. Please try again." });
      } else {
        res.json(updatedBalance);
      }
    }
  );
});

router.put("/pay-bill", (req, res) => {
  const { balance, id } = req.body;
  const neg = Math.abs(balance) * -1;
  Account.findOneAndUpdate(
    { _id: id },
    {
      $inc: { balance: neg },
    },
    { new: true },
    (err, updatedBalance) => {
      console.log(updatedBalance);
      if (err) {
        console.log(err);
        return res.json({
          err: true,
          msg: `Payment must not exceed current balance.`,
        });
      } else {
        res.json(updatedBalance);
      }
    }
  );
});

module.exports = router;
