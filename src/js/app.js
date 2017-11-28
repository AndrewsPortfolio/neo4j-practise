
Vue.component('depOption', {
  props: ['dep'],
  template: '<option>{{ dep.name }}</option>'
})

Vue.component('dep-option', {
  props: ['dep'],
  template: '<option>{{ dep.name }}</option>'
})



var app = new Vue({
  el : '#e_controller',
  data : {
    test : "this is a test",
    departments: [],
    employees: [],
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
          // this.departments.push(data);
          this.departments.$set(data);
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
