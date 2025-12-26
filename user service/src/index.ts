import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`User service is running on port ${PORT}`);
});