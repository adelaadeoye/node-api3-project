const express = require("express");
const postDb = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  postDb
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "Request not completed" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  postDb
    .getById(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "Request not completed" });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  const postID = req.params.id;

  postDb.get().then(posts => {
    const result = posts.find(({ id }) => id == postID);
    if (result) {
      postDb
        .remove(req.params.id)
        .then(posts => {
          res.status(200).json({message:"Delete successfully"});
        })
        .catch(error => {
          res.status(500).json({ message: "Request not completed" });
        });
    } else {
      res.status(400).json({ message: "invalid post id" });
    }
  });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  const id = req.body.user_id;

  postDb.get().then(users => {
    const result = users.find(({ user_id }) => user_id == id);
    if (result) {
      if (!req.body.text) {
        res.status(400).json({ message: "missing required text  field" });
      }
      
      else {
        postDb
          .update(req.params.id, req.body)
          .then(post => {
            res.status(200).json({message:"Update successfully 💯"});
          })
          .catch(error => {
            res.status(500).json({ message: "Request not completed" });
          });
      }
    } else {
      res.status(400).json({ message: "invalid user id or Id not provided 🤡" });
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

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const postID = req.params.id;

  postDb.get().then(posts => {
    const result = posts.find(({ id }) => id == postID);
    if (result) {
      next();
    } else {
      res.status(400).json({ message: "invalid post id" });
    }
  });
}
module.exports = router;
