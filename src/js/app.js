
var departments = new Vue({
  el : '#e_dep',
  data : {
    departments: [],
  },
  created : function(){
    this.getDepartments();
  },
  methods : {
    getDepartments: function(){
      this.$http.get(createUrl('departments')).then(response => {
        this.departments = response.body;
        console.log(this.departments);
      }, response => {
        //error
      }).bind(this);
    },
  }
});
