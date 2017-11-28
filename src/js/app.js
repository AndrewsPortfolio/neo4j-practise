
Vue.component('dep-option', {
  template: '<option>{{ dep.name }}</option>',
  props: ['dep']
})

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
    getDepartments: function(){
      this.$http.get(createUrl('departments')).then(response => {
        if(errorCheck(response)){
          this.departments = extractSingleDataVue(response.body);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
    addDepartment: function(form){
      var data = {"name" : form.target.elements.name.value, "description" : form.target.elements.description.value};
      this.$http.post(createUrl('addDepartment'), data).then(response => {
        if(errorCheck(response)){
          this.departments.push(data);
          form.target.reset();
        }else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    getEmployees: function(){
      this.$http.get(createUrl('Employees')).then(response => {
        if(errorCheck(response)){
          this.employees = extractSingleDataVue(response.body);
        }else{console.log('data error : ' + response);}
      }, response => {
      }).bind(this);
    },
  }
});
