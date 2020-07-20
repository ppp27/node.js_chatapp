
    <title>Simple Group Chat on Node.js</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font: 13px Helvetica, Arial; }
        form { background: #fff; padding: 3px; position: fixed; bottom: 0; width: 100%; border-color: #000; border-top-style: solid; border-top-width: 1px;}
        form input { border-style: solid; border-width: 1px; padding: 10px; width: 85%; margin-right: .5%; }
        form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; margin-left: 2%; }
        #messages { list-style-type: none; margin: 0; padding: 0; }
        #messages li { padding: 5px 10px; }
        #messages li:nth-child(odd) { background: #eee; }
    </style>
    <script src="../../socket.io/socket.io.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="/" method="POST" id="chatForm">
      <input id="txt" autocomplete="off" autofocus="on" oninput="isTyping()" placeholder="type your message here..." /><button>Send</button>
    </form>
<script>
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
</script>
</body>
</html>