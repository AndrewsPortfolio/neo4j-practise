//------------------VARS START------------------//

// REQUIRES //

var express = require('express');
var neo4j = require('neo4j-driver').v1;
var http = require('http');
var path = require("path");

// WEB SERVER //

var dir = '/htdocs';

var webSettings = {
  'port' : 1337,
  'dir' : dir,
  'pages' : [
    {'route': '/', 'file' : '/index.html'},
    {'route': '/home', 'file' : '/index.html'},
    {'route': '/football', 'file' : '/football.html'},
    {'route': '/employee', 'file' : '/employee.html'}
  ],
  'data' : [
    {'url' : '/css', 'dir' : dir + '/css'},
    {'url' : '/js', 'dir' : dir+ '/js'},
    {'url' : '/inc', 'dir' : dir+ '/inc'},
    {'url' : '/img', 'dir' : dir+ '/img'},
  ]
}

// DB SETTINGS //

var dbSettings = {
  'username': 'webConnect',
  'password': 'b.ryA4HdyLygdx.QaFLplpKB3qWDWkX',
  'url': 'bolt://hobby-kmoladampbiogbkelgkfagal.dbs.graphenedb.com:24786',
  'port': 3000
};

var driver = neo4j.driver(dbSettings.url, neo4j.auth.basic(dbSettings.username, dbSettings.password));

// APP //
var app = express();

webSettings.data.forEach(function(data) {
  app.use(data.url,express.static(path.join(__dirname+data.dir)));
});

//------------------VARS END------------------//

//------------------PAGES START------------------//

webSettings.pages.forEach(function(page) {
  app.get(page.route, function(req, res) {
    res.sendFile(path.join(__dirname+webSettings.dir+page.file));
    console.log('route : ' + page.route + ' | page : ' + page.file);
  });
});

//------------------PAGES END------------------//

//------------------DATA START------------------//

app.get('/stats', function(req, res) {
  const session = driver.session();
  session.run('match (n) return count(n) as nodes').subscribe({
    onNext: function(record) {
      // record.forEach(function(value, index) {});
      res.json(record._fieldLookup.nodes);
    },onCompleted: function(metadata) {
      session.close();
    }
  });
});

app.post('/addTeam', function(req, res) {
  const session = driver.session();
  return session.run('CREATE (a:Team {name: $name})', {name: name}).then(result => {
    session.close();
    return result;
  });
});

//------------------DATA END------------------//
//------------------FUNCTIONS START------------------//

//------------------FUNCTIONS END------------------//
// LISTEN //
app.listen(webSettings.port);
