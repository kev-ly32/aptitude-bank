const express = require("express"),
  router = express.Router(),
  User = require("../models/User"),
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
  const transaction = {
    amount: balance,
    transaction: "Deposit",
    date: new Date(),
  };
  Account.findOneAndUpdate(
    { _id: id },
    {
      $inc: { balance },
      $push: { transactions: transaction },
    },
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
  const transaction = {
    amount: neg,
    transaction: "Bill Payment",
    date: Date(),
  };
  Account.findOneAndUpdate(
    { _id: id },
    {
      $inc: { balance: neg },
      $push: { transactions: transaction },
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
  const transaction1 = {
    amount: neg,
    transaction: "transfer sent",
    date: Date(),
  };
  const transaction2 = {
    amount: amount,
    transaction: "transfer received",
    date: Date(),
  };
  Account.findOneAndUpdate(
    { _id: account1 },
    {
      $inc: { balance: neg },
      $push: { transactions: transaction1 },
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
            $push: { transactions: transaction2 },
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
    { $and: [{ userID: req.body.sinNumber }, { default: true }] },
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
              if (updatedAccount2 === null) {
                updatedAccount2 = {};
              }
              res.json([updatedAccount1, updatedAccount2]);
            }
          }
        );
      }
    }
  );
});

router.put("/etransfer", (req, res) => {
  const { account, amount, email } = req.body;
  const neg = -Math.abs(amount);
  const transaction1 = {
    amount: neg,
    transaction: "e-Transfer sent",
    date: Date(),
  };
  const transaction2 = {
    amount: amount,
    transaction: "e-Transfer received",
    date: Date(),
  };

  User.findOne({ username: email }, (err, user) => {
    if (!user || err) {
      return res.json({ err: true, msg: "No account with that email" });
    } else {
      Account.findOneAndUpdate(
        {
          $and: [
            {
              userID: user.sinNumber,
            },
            {
              default: true,
            },
          ],
        },
        {
          $inc: { balance: amount },
          $push: { transactions: transaction2 },
        },
        { new: true },
        (err, updatedAccount2) => {
          if (!updatedAccount2 || err) {
            return res.json({
              err: true,
              msg: "Account holder has not set up an account for e-Transfers",
            });
          } else {
            Account.findOneAndUpdate(
              {
                _id: account,
              },
              {
                $inc: { balance: neg },
                $push: { transactions: transaction1 },
              },
              { new: true },
              (err, updatedAccount1) => {
                if (err) {
                  return res.json({
                    err: true,
                    msg: "Could not send e-Transfer",
                  });
                } else {
                  res.json(updatedAccount1);
                }
              }
            );
          }
        }
      );
    }
  });
});

module.exports = router;
