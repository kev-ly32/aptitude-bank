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
        res.json({ error: "Balance was not updated. Please try again." });
      } else {
        res.json(updatedBalance);
      }
    }
  );
});

router.put("/pay-bill", (req, res) => {
  const { balance, id } = req.body;
  const neg = -Math.abs(balance);
  Account.findOneAndUpdate(
    { _id: id },
    {
      $inc: { balance: neg },
    },
    { new: true },
    (err, updatedBalance) => {
      if (err) {
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

router.put("/transfer", (req, res) => {
  const { amount, account1, account2 } = req.body;
  const neg = -Math.abs(amount);
  Account.findOneAndUpdate(
    { _id: account1 },
    {
      $inc: { balance: neg },
    },
    { new: true },
    (err, updatedAccount1) => {
      if (err) {
        return res.json({ err: true, msg: "Error transferring money." });
      } else {
        Account.findOneAndUpdate(
          {
            _id: account2,
          },
          {
            $inc: { balance: amount },
          },
          { new: true },
          (err, updatedAccount2) => {
            if (err) {
              return res.json({ err: true, msg: "Error transferring money." });
            } else {
              res.json([updatedAccount1, updatedAccount2]);
            }
          }
        );
      }
    }
  );
});

router.put("/default", (req, res) => {
  Account.findOneAndUpdate(
    { default: true },
    { default: false },
    { new: true },
    (err, updatedAccount2) => {
      if (err) {
        return res.json({
          err: true,
          msg: "Error setting default account",
        });
      } else {
        Account.findOneAndUpdate(
          { _id: req.body.account },
          { default: true },
          { new: true },
          (err, updatedAccount1) => {
            if (err) {
              return res.json({
                err: true,
                msg: "Error setting default account",
              });
            } else {
              res.json([updatedAccount1, updatedAccount2]);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
