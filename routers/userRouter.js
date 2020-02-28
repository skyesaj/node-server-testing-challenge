const router = require("express").Router();

const user = require("./userModel");

router.post("/", (req, res) => {
  const userData = req.body;

  if (userData.name) {
    user
      .insert(userData)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({ error: "no" });
      });
  } else {
    res.status(400).json({ error: "require" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  user
    .remove(id)
    .then(deleted => {
      res.status(200).json({ message: "deleted" });
    })
    .catch(error => {
      res.status(500).json({ error: "nope" });
    });
});

module.exports = router;
