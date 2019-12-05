const express = require('express');
const usersDb= require('./userDb');


const router = express.Router();

router.post('/', validateUser,(req, res) => {
  // do your magic!
  usersDb.insert(req.body)
  .then(user=>{
    res.status(201).json(user)
  })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  usersDb.get()
  .then(users=>{
    res.status(200).json(users)
   
  })
  .catch(error=>{
    res.status(500).json({message:"Request not completed"})
  })
});

router.get('/:id', validateUserId,(req, res) => {
  // do your magic!
  const id = req.params.id;

  usersDb.getById(id)
  .then(users=>{
    res.status(200).json(users)
   
  })
  .catch(error=>{
    res.status(500).json({message:"Request not completed"})
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  usersDb.getUserPosts(id)
  .then(users=>{
    res.status(200).json(users)
   
  })
  .catch(error=>{
    res.status(500).json({message:"Request not completed"})
  })
});

router.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  const id = req.params.id;
  usersDb.remove(id)
  .then(users=>{
    usersDb.get()
    .then(users=>{
      res.status(200).json(`Remaining ${users.length} users`)
     
    })
  })
  .catch(error=>{
    res.status(500).json({message:"Request not completed"})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userId = req.params.id;
    
  usersDb.get()
 .then(users=>{
  const result = users.find( ( {id} ) => id == userId );
  if (result){
    next()
  }
  else{
    res.status(400).json({message: "invalid user id"})
  }
 })  
}

  

function validateUser(req, res, next) {
  // do your magic!
  const user=req.body.name;
  if(!req.body){
    res.status(400).json({ message: "missing user data" })
  }
  else if(!req.body.name){
    res.status(400).json({ message: "missing required name field" }
    )
  }
  else next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
