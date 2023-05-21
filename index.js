const express = require('express');
const app = express();
const port = 3001;

const USERS = [];
const QUESTIONS = [
  {
    title: 'Two states',
    description: 'Given an array, return the maximum of the array?',
    testcases: [
      {
        input: "[1, 2, 3, 4, 5]",
        output: "5"
      }
    ]
  }
];
const SUBMISSIONS = [
  {
    userId: '1',
    question: '1',
    code: "function max(arr) {return Math.max(...arr)}",
    status: 'accepted'
  },
  {
    userId: '1',
    question: '1',
    code: "function max(arr) {return Math.max(...arr)}",
    status: 'rejected'
  }
];

app.use(express.json());

app.post('/signup', function(req, res) {
  const { email, password } = req.body;
  const existingUser = USERS.find(user => user.email === email);

  if (existingUser) {
    res.status(409).send('User already exists');
  } else {
    USERS.push({ email, password });
    res.status(200).send('User registered successfully');
  }
});

app.post('/login', function(req, res) {
  const { email, password } = req.body;
  const user = USERS.find(user => user.email === email);

  if (!user || user.password !== password) {
    res.status(401).send('Invalid email or password');
  } else {
    const token = 'randomToken'; // Generate or fetch a random token
    res.status(200).json({ token });
  }
});

app.get('/questions', function(req, res) {
  res.status(200).json(QUESTIONS);
});

app.get('/submissions', function(req, res) {
  res.status(200).json(SUBMISSIONS);
});

app.post('/submit', function(req, res) {
  const { userId, question, code } = req.body;
  const submissionStatus = Math.random() < 0.5 ? 'accepted' : 'rejected';
  const newSubmission = { userId, question, code, status: submissionStatus };
  SUBMISSIONS.push(newSubmission);

  res.status(200).send('Submission received');
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`);
});
