var app = new Vue({
  el : '#e_controller',
  data : {
    test : "this is a test",
    departments: [],
    employees: [],
    assignDep : {"employee":{'first_name':"",'surename':"",'email':"",'job_title':""},"department":{'name':"",'description':""}}

  },
  created : function(){
    this.getDepartments();
    this.getEmployees();
  },
  methods : {
    //get functions
    getDepartments: function(){
      this.$http.get(createUrl('departments')).then(response => {
        if(errorCheck(response)){
          console.log(response.body);
          this.departments = extractData(response.body, null);
          console.log(this.departments);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    getEmployees: function(){
      this.$http.get(createUrl('Employees')).then(response => {
        if(errorCheck(response)){
          this.employees = extractData(response.body, this.empExtras);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    //add functions
    addDepartment: function(form){
      var data = {"name" : form.target.elements.name.value, "description" : form.target.elements.description.value};
      this.$http.post(createUrl('addDepartment'), data).then(response => {
        if(errorCheck(response)){
          this.departments.push(data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    addEmployee: function(form){
      var data = formToObj(form.target.elements, this.employeeModel);
      data.department = searchData(form.target.elements.department.value, 'name', this.departments);
      this.$http.post(createUrl('addEmployee'), data).then(response => {
        if(errorCheck(response)){
          this.employees.push(data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
  }
});
