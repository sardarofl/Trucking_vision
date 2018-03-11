
<?php
  // Create database connection
  $db = mysqli_connect("127.0.0.1", "root", "", "trucking");

  // Initialize message variable
  $msg = "";

  // If upload button is clicked ...
  if (isset($_POST['upload'])) {
  	// Get image name
  	$image = $_FILES['image']['name'];
    $product = $_POST['product'];
    $product_description = $_POST['product_description'];
    $product_category = $_POST['category'];
    $product_id = $_POST['id'];
    echo($product_category);

  	// Get text
  	//$image_text = mysqli_real_escape_string($db, $_POST['image_text']);

  	// image file directory
  	$target = "../images/".basename($image);

  //s	$sql = "UPDATE categories SET image='$image'";
  $sql = "INSERT INTO products (product_name,description,categorie, image) VALUES ('$product','$product_description','$product_category', '$image')";
  	// execute query
  	mysqli_query($db, $sql);

  	if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
  		$msg = "Image uploaded successfully";
  	}else{
  		$msg = "Failed to upload image";
  	}
    header("Location: edit_product.php?id=$product_id&category=$product_category");

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

    <title>Trucking Vision - Edit Product</title>

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
                        <h1 class="page-header">Edit Products</h1>
                    </div>
						<!-- /.col-lg-12 -->
            <form method="POST" action="edit_product.php" enctype="multipart/form-data">
            <input id="field_product" name="product" class="form-control" placeholder="Add a product">
            <input id="field_product_description" name="product_description" class="form-control" placeholder="Type a description about the product">

           <input id="hidden_category"type="hidden" name="category" value="Default">
           <input id="hidden_id"type="hidden" name="id" value="0">

           <div>
             <input type="file" name="image">
           </div>
           <div>
             <button type="submit" name="upload">Submit</button>
           </div>
           </form>

           <table id="trucking_products" style="width:100%">
             <tr>
             <th>Product Name</th>
             <th>Image</th>
             <th>Edit Gallery</th>
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

  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  };


  var category_selected = getUrlParameter('category');
    var id_selected = getUrlParameter('id');
document.getElementById("hidden_category").setAttribute("value", category_selected);
document.getElementById("hidden_id").setAttribute("value", id_selected);
/////////////////set data to above fields////////////////////////////////////////////
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    for(var i=0;i<myObj.length;i++)
    {
      if(category_selected==myObj[i].categorie)
      {
        var table = document.getElementById("trucking_products");
        var row = table.insertRow();

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        // Add some text to the new cells:
        console.log(category_selected);
        cell1.innerHTML = myObj[i].product_name;
        cell2.innerHTML = myObj[i].description;

        cell3.innerHTML ="<a href=edit_product.php?id="+myObj[i].id+"&category="+category_selected+">Edit Gallery</a>";
        cell4.innerHTML ="<a href=delete_product.php?id="+myObj[i].id+"&category="+category_selected+">Delete</a>";

        //cell5.innerHTML ="<form method='post'><input name='del_value' value="+myObj[i].id+" class='form-control'><input class='deletetable' type='submit' value='Delete' class='btn btn-primary'></input></form>";

      }
      }

  }
};
xmlhttp.open("GET", "http://localhost:3000/Products", true);
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
