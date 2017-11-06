var authToken = neo4j.v1.auth.basic("neo4j", "neo4j");
var driver = neo4j.v1.driver("bolt://127.0.0.1:7687", authToken, {encrypted:false});

var session = driver.session();


$( "#addDepartment" ).submit(function( e ) {
  e.preventDefault();
  var form = document.getElementById('addDepartment'), formData = new FormData(form);
  var label = "Department";
  var statment = "MERGE (a:" + label + "{name:{d_name},description:{d_desc}})";
  var parameters = {"d_name":formData.get('name'),"d_desc":formData.get('desc')}
  runDB(statment, parameters);
});

function runDB(statement, parameters){
  session.run(statement, parameters).subscribe({
      onNext: function(record) {
        console.log('onNext function : ' + record);
      },
      onCompleted: function(metadata) {
        console.log('onCompleted function');
      }
  });
}
