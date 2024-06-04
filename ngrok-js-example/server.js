const http = require('http');
const ngrok = require('@ngrok/ngrok');

// Create and start the webserver
http.createServer((req, res) => {
  console.log(req.url)

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<div>
        <h1>Congrats! you have created an ngrok web server</h1>
    </div>
  `);
  // showEmailUserName(req, res)
}).listen(8080, () => console.log('Node.js web server at 8080 is running...'));

// Setup ngrok
ngrok.connect({ 
    addr: 8080, 
    domain: "gowrite.art", 
    authtoken_from_env: true,

    // basic_auth: ["username:password"],
    // oauth_provider: "google",
    // oauth_allow_domains: "ngrok.com",
 }) .then(listener => console.log(`Ingress established at: ${listener.url()}`));


const showEmailUserName = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const email	 = req.headers['ngrok-auth-user-email']
  const userName	 = req.headers['ngrok-auth-user-name']

  res.end(`<div>
        So many changes!
        <h1>Congrats! you have created an ngrok web server</h1>
        <div style="color:red">EMAIL: ${email} </div>
        <div style="color:red">Name: ${userName} </div>
    </div>
  `);
}