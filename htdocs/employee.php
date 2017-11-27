<!doctype html>
<html lang="en">
<?php require 'inc/head.php';?>
<body>
  <?php require 'inc/nav.php';?>
  <main class="fluid-container">
    <section class="jumbotron jumbotron-fluid">
      <div class="container">
        <div class="row">
          <h1 class="display-3">Employees</h1>
        </div>
        <div class="row">
          <p class="lead">this example uses employees and departments as well as managers.</p>
        </div>
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addEmployee">Add Employee</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addDepartment">Add Department</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <?php require 'inc/footer.php';?>
  <?php require 'inc/employee/modals.php';?>
  <?php require 'inc/scripts.php';?>
</body>
</html>
