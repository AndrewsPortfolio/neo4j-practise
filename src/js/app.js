var app = new Vue({
  el : '#e_controller',
  data : {
    test : "this is a test",
    departments: [],
    employees: [],
    assignDep : {
      "employee" : {
        'first_name' : "",
        'surename' : "",
        'email' : "",
        'job_title' : ""
      },
      "department" : {
        'name' : "",
        'description' : ""
      }
    }
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
          this.departments = extractSingleDataVue(response.body);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    getEmployees: function(){
      this.$http.get(createUrl('Employees')).then(response => {
        console.log(response.body);
        console.log(extractEmployee(response.body));
        if(errorCheck(response)){
          // this.employees = extractSingleDataVue(response.body);
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
      var data = {
        "first_name" : form.target.elements.first_name.value,
        "surename" : form.target.elements.surename.value,
        "email" : form.target.elements.email.value,
        "job_title" : form.target.elements.job_title.value,
        // "department" : form.target.elements.department.value
        "department" : searchData(form.target.elements.department.value, 'name', this.departments)

      };
      this.$http.post(createUrl('addEmployee'), data).then(response => {
        if(errorCheck(response)){
          this.employees.push(data);
          // form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
  }
});
