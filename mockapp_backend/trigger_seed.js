import http from 'http';

// --- CONFIGURATION START ---
const expertEmail = "balasudhan17@gmail.com";
const candidateEmail = "codetalk24x7@gmail.com";

// Timing Configuration
const now = new Date();
// Set start time (e.g., 2 minutes from now)
const startTime = new Date(now.getTime() + 2 * 60 * 1000);
// Set end time (e.g., 60 minutes after start)
const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

// You can also hardcode dates like:
// const startTime = new Date("2025-12-12T10:00:00Z");
// const endTime = new Date("2025-12-12T11:00:00Z");
// --- CONFIGURATION END ---

const data = JSON.stringify({
  expertEmail,
  candidateEmail,
  startTime: startTime.toISOString(),
  endTime: endTime.toISOString()
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/sessions/dev/seed/test-session',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  let responseBody = '';

  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  res.on('end', () => {
    console.log('Response:', responseBody);
    import('fs').then(fs => {
      fs.writeFileSync('seed_output.json', responseBody);
    });
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
