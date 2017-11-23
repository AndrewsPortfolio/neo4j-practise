$("#addEmployeeForm").submit(function(e){
  e.preventDefault();
  logDebug('Form', 'addEmployeeForm');
  var form = document.getElementById('addEmployeeForm');
  var formData = new FormData(form);
  formData.append('request', 'addEmployee');
  submitForm('Employee Add', formData, 'addemployee', '#addEmployee');
});
