$("#addEmployeeForm").submit(function(e){
  e.preventDefault();
  var form = document.getElementById("addEmployeeForm");
  var data = new FormData(form);
  submitForm(formToArray(data), 'addEmployee');
});

$("#addDepartmentForm").submit(function(e){
  e.preventDefault();
  var form = document.getElementById("addDepartmentForm");
  var data = new FormData(form);
  submitForm(formToArray(data), 'addDepartment');
});
