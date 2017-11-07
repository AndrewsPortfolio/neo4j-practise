var authToken = neo4j.v1.auth.basic("neo4j", "neo4j");
var driver = neo4j.v1.driver("bolt://127.0.0.1:7687", authToken, {
  encrypted: false
});

var session = driver.session();

$("#addDepartment").submit(function(e) {
  e.preventDefault();
  var form = $('#addDepartment')[0],
    formData = new FormData(form);
  var label = ":Department";
  var parameters = {
    "d_name": formData.get('name'),
    "d_desc": formData.get('desc')
  }
  var statement = mergeStatement(label, "name:{d_name},description:{d_desc}");
  session.run(statement, parameters).subscribe({
    onCompleted: function(metadata) {
      $('#addDepartment').trigger("reset");
      updateDepartmentsTable();
    }
  });
});

$("#addEmployee").submit(function(e) {
  e.preventDefault();
  var form = $('#addEmployee')[0],
    formData = new FormData(form);
  var label = ":Employee";
  var parameters = {
    "e_fname": formData.get('firstName'),
    "e_surename": formData.get('surename'),
    "e_jobTitle": formData.get('jobTitle')
  }
  var statement = mergeStatement(label, "first_name:{e_fname},surename:{e_surename},job_title:{e_jobTitle}");

  session.run(statement, parameters).subscribe({
    onCompleted: function(metadata) {
      $('#addEmployee').trigger("reset");
      updateEmployeesTable();
    }
  });
});

$("#customStatement").submit(function(e) {
  e.preventDefault();
  var form = $('#customStatement')[0], formData = new FormData(form);
  var statement = formData.get('statement');

  session.run(statement).subscribe({
    onNext: function(record) {
      console.log("returned : ");
      console.log(record);
      record.forEach(function(value) {
        console.log(value);
      });
    },
    onCompleted: function(metadata) {
      console.log("completed :");
      console.log(metadata);
    }
  });
});

function mergeStatement(label, properties) {
  return "MERGE (a " + label + " {" + properties + "})";
}

function matchStatement(label) {
  return "Match (a " + label + ") RETURN a";
}

function updateEmployeesTable() {
  $("#empTable tr").remove();
  var employees = matchStatement(":Employee");
  session.run(employees).subscribe({
    onNext: function(record) {
      record.forEach(function(value, index) {
        var emp = value.properties;
        var markup = "<tr><td>" + value.identity.low + "</td><td>" + emp.first_name + "</td><td>" + emp.surename + "</td><td>" + emp.job_title + "</td></tr>";
        $("#empTable tbody").append(markup);
      });
    },
  });
}

function updateDepartmentsTable() {
  $("#depTable tr").remove();
  var departments = matchStatement(":Department");
  session.run(departments).subscribe({
    onNext: function(record) {
      record.forEach(function(value, index) {
        var dep = value.properties;
        var markup = "<tr><td>" + value.identity.low + "</td><td>" + dep.name + "</td><td>" + dep.description + "</td></tr>";
        $("#depTable tbody").append(markup);
      });
    },
  });
}

$(document).ready(function() {
  var t0 = performance.now();
  updateEmployeesTable();
  var t1 = performance.now();
  console.log("to get employees : " + (t1 - t0) + " milliseconds.")
  var t0 = performance.now();
  updateDepartmentsTable();
  var t1 = performance.now();
  console.log("to get Departments : " + (t1 - t0) + " milliseconds.")
});
