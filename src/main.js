const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('messages.db');
const path = require('path')
const app = express()
const port = 3000

db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await getLastMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/submit-message', (req, res) => {
  const { username, message } = req.body;

  db.run('INSERT INTO messages (username, message) VALUES (?, ?)', [username, message], (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`New message from ${username} : ${message}`);
    }
  });  

  res.json({ message: 'Form submitted'})

});

function getLastMessages() {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT id, username, message FROM messages ORDER BY id DESC LIMIT 50',
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const messages = [];
          rows.forEach((row) => {
            messages.push({
              username: row.username,
              message: row.message
            });
          });
          resolve(messages);
        }
      }
    );
  });
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
