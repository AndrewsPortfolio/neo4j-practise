Vue.mixin({
  data: function() {
    return {
      //employee model
      get employeeModel() {
        return [
          'first_name',
          'surename',
          'email',
          'job_title'
        ];
      },
      //optional extras
      get empExtras() {
        return [
          'department',
          'manager'
        ];
      },
      get departmentModel() {
        return [
          'name',
          'description'
        ];
      },
      get depExtras() {
        return [
          'count'
        ];
      }
    }
  }
})
