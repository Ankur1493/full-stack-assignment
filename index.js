const express = require('express')
const app = express()
const port = 3001

app.use(express.json())

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

const admin = [];



app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password

  const {email,password} = req.body;
  const user = {
    email,
    password
  }
  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  if(!USERS.includes(email)){
    USERS.push(user)
  }
  console.log(USERS);
  
  // return back 200 status code to the client
  res.status(200).json({
    status: "success",
    message: "user signed up"
  })
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const {email,password} = req.body;
  const user = {
    email,
    password
  }
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  USERS.filter((user)=>{
    if(user.email === email && user.password === password){
      return res.status(200).json({
        status: "success",
        message: "you have been logged in"
      })
    }
  })

  // If the password is not the same, return back 401 status code to the client
  res.status(401).json('enter correct email and password')
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
    res.status(200).json({
    status: "success",
    QUESTIONS
  })
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
   res.status(200).json({
    status: "success",
    SUBMISSION
  })
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   const submission = req.body.submission;
   // Store the submission in the SUBMISSION array above
   SUBMISSION.push(submission);
  res.status(200).json({
    status: "success",
    submission
  })
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})