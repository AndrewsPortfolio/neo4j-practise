
//local
const username = 'neo4j', password = 'neo4j', url = 'bolt://127.0.0.1:7687';

//remote
// var username = 'webConnect', password = 'b.ryA4HdyLygdx.QaFLplpKB3qWDWkX', url = 'bolt://hobby-kmoladampbiogbkelgkfagal.dbs.graphenedb.com:24786';
var driver = neo4j.v1.driver(url, neo4j.v1.auth.basic(username, password));
var session = driver.session();

//vars
var empProps = ['first_name','surename', 'job_title'];
var depProps = ['name', 'description'];

var teamProps = ['name'];
var matchProps = ['date', 'location'];

var tables = [
  {'table':'depTable','label':'Department','props':depProps},
  {'table':'empTable','label':'Employee','props':empProps},
  {'table':'teamTable','label':'Team','props':teamProps}
];

$(document).ready(function() {

  tables.forEach(function(table) {
    if($('#' + table.table).length){
      updateLabelTable(table.table, table.label, table.props);
    }
  });

  updateSelect('h_team','Team','name');
  updateSelect('a_team','Team','name');

});
