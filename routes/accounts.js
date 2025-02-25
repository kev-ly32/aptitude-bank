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
  Account.findOne({ _id: id }, (err, account) => {
    const updatedBalance = account.balance + balance;

    Account.findOneAndUpdate(
      { _id: id },
      {
        $inc: { balance },
        $push: {
          transactions: {
            amount: balance,
            transaction: "Deposit",
            date: new Date(),
            newBalance: updatedBalance,
          },
        },
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
});

router.put("/pay-bill", (req, res) => {
  const { balance, id } = req.body;
  const neg = -Math.abs(balance);
  Account.findOne({ _id: id }, (err, account) => {
    const updatedBalance = account.balance + neg;

    Account.findOneAndUpdate(
      { _id: id },
      {
        $inc: { balance: neg },
        $push: {
          transactions: {
            amount: neg,
            transaction: "Bill Payment",
            date: Date(),
            newBalance: updatedBalance,
          },
        },
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
});

router.put("/transfer", (req, res) => {
  const { amount, account1, account2 } = req.body;
  const neg = -Math.abs(amount);
  let updated1 = 0;
  let updated2 = 0;
  Account.findOne({ _id: account1 }, (err, account) => {
    updated1 = account.balance + neg;
    Account.findOne({ _id: account2 }, (err, account) => {
      updated2 = account.balance + amount;

      Account.findOneAndUpdate(
        { _id: account1 },
        {
          $inc: { balance: neg },
          $push: {
            transactions: {
              amount: neg,
              transaction: "Transfer sent",
              date: Date(),
              newBalance: updated1,
            },
          },
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
                $push: {
                  transactions: {
                    amount: amount,
                    transaction: "Transfer received",
                    date: Date(),
                    newBalance: updated2,
                  },
                },
              },
              { new: true },
              (err, updatedAccount2) => {
                if (err) {
                  return res.json({
                    err: true,
                    msg: "Error transferring money.",
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
  });
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
  let updated1 = 0;
  let updated2 = 0;

  User.findOne({ username: email }, (err, user) => {
    if (!user || err) {
      return res.json({ err: true, msg: "No account with that email" });
    } else {
      Account.findOne(
        { $and: [{ userID: user.sinNumber }, { default: true }] },
        (err, recipientAccount) => {
          updated2 = recipientAccount.balance + amount;
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
              $push: {
                transactions: {
                  amount: amount,
                  transaction: "e-Transfer received",
                  date: Date(),
                  newBalance: updated2,
                },
              },
            },
            { new: true },
            (err, updatedAccount2) => {
              if (!updatedAccount2 || err) {
                return res.json({
                  err: true,
                  msg:
                    "Account holder has not set up an account for e-Transfers",
                });
              } else {
                Account.findOne({ _id: account }, (err, account) => {
                  updated1 = account.balance + neg;
                  Account.findOneAndUpdate(
                    {
                      _id: account,
                    },
                    {
                      $inc: { balance: neg },
                      $push: {
                        transactions: {
                          amount: neg,
                          transaction: "e-Transfer sent",
                          date: Date(),
                          newBalance: updated1,
                        },
                      },
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
                });
              }
            }
          );
        }
      );
    }
  });
});

module.exports = router;
