<div id="addEmployee" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <form id="addEmployeeForm" name="addEmployeeForm" class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Employee</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row form-group">
          <div class="col-6">
            <label for="f_name">First Name</label>
            <input type="text" class="form-control" id="f_name" placeholder="First Name">
          </div>
          <div class="col-6">
            <label for="l_name">Last Name</label>
            <input type="text" class="form-control" id="l_name" placeholder="last Name">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="email">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <label for="job">Job Title</label>
            <input type="text" class="form-control" id="job" placeholder="job">
          </div>
        </div>
        <div class="row form-group">
          <div class="col">
            <small id="manager" class="form-text text-muted float-right">Assign manager ?</small>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-primary">Add Employee</button>
      </div>
    </form>
  </div>
</div>
