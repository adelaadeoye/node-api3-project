const express = require("express");
const usersDb = require("./userDb");
const postDb = require("../posts/postDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  usersDb.insert(req.body).then(user => {
    res.status(201).json(user);
  });
});

router.post("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const userId = req.body.user_id;

  usersDb.get().then(users => {
    const result = users.find(({ id }) => id == userId);
    if (result) {
      if (!req.body.text) {
        res.status(400).json({ message: "missing required text or user_id field" });
      }
      
      else {
        postDb
          .insert(req.body)
          .then(post => {
            res.status(200).json(post);
          })
          .catch(error => {
            res.status(500).json({ message: "Request not completed" });
          });
      }
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
  console.log(req.body);
  
});

router.get("/", (req, res) => {
  // do your magic!
  usersDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Request not completed" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  usersDb
    .getById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Request not completed" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  usersDb
    .getUserPosts(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Request not completed" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  usersDb
    .remove(id)
    .then(users => {
      usersDb.get().then(users => {
        res.status(200).json(`Remaining ${users.length} users`);
      });
    })
    .catch(error => {
      res.status(500).json({ message: "Request not completed" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  console.log(req.body);
  if (req.body.name) {
    usersDb
      .update(id, req.body)
      .then(user => {
        if (user == 1) {
          usersDb.getById(id).then(users => {
            res.status(200).json(users);
          });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Request not completed" });
      });
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userId = req.params.id;

  usersDb.get().then(users => {
    const result = users.find(({ id }) => id == userId);
    if (result) {
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body.name;
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
