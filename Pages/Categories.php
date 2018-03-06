
<?php
  // Create database connection
  $db = mysqli_connect("127.0.0.1", "root", "", "trucking");

  // Initialize message variable
  $msg = "";

  // If upload button is clicked ...
  if (isset($_POST['upload'])) {
  	// Get image name
  	$image = $_FILES['image']['name'];
    $category = $_POST['category'];

  	// Get text
  	//$image_text = mysqli_real_escape_string($db, $_POST['image_text']);

  	// image file directory
  	$target = "../images/".basename($image);

  //s	$sql = "UPDATE categories SET image='$image'";
  $sql = "INSERT INTO categories (category_name, image) VALUES ('$category', '$image')";
  	// execute query
  	mysqli_query($db, $sql);

  	if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
  		$msg = "Image uploaded successfully";
  	}else{
  		$msg = "Failed to upload image";
  	}
  }
  $result = mysqli_query($db, "SELECT * FROM images");
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Vision Trucking - Categories</title>

    <!-- Bootstrap Core CSS -->
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Vision Trucking</a>
            </div>
            <!-- /.navbar-header -->

              <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">

                        <li>
                            <a href="admin.html"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>

                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Edit Categories</h1>
                    </div>
						<!-- /.col-lg-12 -->

            <form method="POST" action="Categories.php" enctype="multipart/form-data">
            <input id="field_category" name="category" class="form-control" placeholder="Enter a new Category Name">
           <input type="hidden" name="size" value="1000000">
           <div>
             <input type="file" name="image">
           </div>
           <div>
             <button type="submit" name="upload">Submit</button>
           </div>
           </form>

           <table id="trucking_categories" style="width:100%">
             <tr>
             <th>Category Name</th>
             <th>Image</th>
             <th>Edit Products</th>
             <th>Delete</th>
             </tr>
             <tr>
             <td ></td>
             <td ></td>
             <td ></td>
             <td ></td>
             </tr>

           </table>

					</div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="../vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../vendor/metisMenu/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>

</body>

<!-- jQuery -->
<script src="../vendor/jquery/jquery.min.js"></script>
<script>
$(document).ready(function(){

/////////////////set data to above fields////////////////////////////////////////////
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    for(var i=0;i<myObj.length;i++)
    {
      var table = document.getElementById("trucking_categories");
      var row = table.insertRow();

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);

      // Add some text to the new cells:
      cell1.innerHTML = myObj[i].category_name;
      cell2.innerHTML = myObj[i].image;
      cell3.innerHTML ="<a href=edit_product.php?id="+myObj[i].id+"&category="+myObj[i].category_name+">Edit Products</a>";
      cell4.innerHTML ="<a href=delete_category.php?id="+myObj[i].id+">Delete</a>";
      //cell5.innerHTML ="<form method='post'><input name='del_value' value="+myObj[i].id+" class='form-control'><input class='deletetable' type='submit' value='Delete' class='btn btn-primary'></input></form>";
    }

  }
};
xmlhttp.open("GET", "http://localhost:3000/Categories", true);
xmlhttp.send();

//////////////////end setting data///////////////////////////
});








</script>



<style>
table, th, td {
    border: 1px solid black;
	text-align:center;
}




</style>
</html>
