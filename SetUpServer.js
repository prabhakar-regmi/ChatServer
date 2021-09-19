const path = require('path');
exports.SetupServer = function(express, port_number) {
    var app = express();
    app.use(express.json());
    app.use(express.static(path.join(__dirname, './')));

    // Serve the welcome page
    app.get('/', (req,res)=>{
        res.sendFile(path.join(__dirname, './HTML/welcome_page.html'));
    });

    // Serve the chat Page
    app.get('/api/chat', (req,res)=>{
        if (!req.query.name){
            res.send("Not Available!");
        }
        else
        {
            res.sendFile(path.join(__dirname, './HTML/chat.html'));
        }
    });

    // POST on the chat API - redirects to the chat page right now.
    app.post('/api/chat', (req, res)=>{
        let redirect_url = '/api/chat?name=' + req.body.username;
        res.redirect(redirect_url);
    });

    // Establish  a connection by listening on a port
    var server = app.listen(port_number,(e)=>{
        console.log(`Server is listening on port # ${server.address().port}`);
    });
  
    return server;
};