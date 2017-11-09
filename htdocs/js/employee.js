var empProps = ['first_name','surename', 'job_title'];
var depProps = ['name', 'description'];

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
      updateLabelTable('depTable','Department',depProps);
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
      updateLabelTable('empTable','Employee',empProps);
    }
  });
});

$(document).ready(function() {
  updateLabelTable('depTable','Department',depProps);
  updateLabelTable('empTable','Employee',empProps);
});
