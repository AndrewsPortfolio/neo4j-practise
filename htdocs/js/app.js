var authToken = neo4j.v1.auth.basic("neo4j", "neo4j");
var driver = neo4j.v1.driver("bolt://127.0.0.1:7687", authToken, {encrypted:false});

var session = driver.session();

$( "#addDepartment" ).submit(function( e ) {
  e.preventDefault();
  var form = document.getElementById('addDepartment'), formData = new FormData(form);
  var label = ":Department";
  var parameters = {"d_name":formData.get('name'),"d_desc":formData.get('desc')}
  var statment = createStatement(label, "name:{d_name},description:{d_desc}");
  runDB(statment, parameters);
});

$( "#addEmployee" ).submit(function( e ) {
  e.preventDefault();
  var form = document.getElementById('addEmployee'), formData = new FormData(form);
  var label = ":Employee";
  var parameters = {"e_fname":formData.get('firstName'),"e_surename":formData.get('surename'), "e_jobTitle":formData.get('jobTitle')}
  var statment = createStatement(label, "first_name:{e_fname},surename:{e_surename},job_title:{e_jobTitle}");
  runDB(statment, parameters);
});

function createStatement(label, properties){
  return "MERGE (a " + label + " {" + properties + "})";
}

function runDB(statement, parameters){
  session.run(statement, parameters).subscribe({
      onNext: function(record) {
        console.log('onNext function : ' + record);
      },
      onCompleted: function(metadata) {
        console.log('onCompleted function');
        console.log('record added');
      }
  });
}
