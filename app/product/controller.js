app.controller('productsCtrl', function($scope, $http) {

    // delete product
    $scope.deleteProduct = function(id){
     
        // ask the user if he is sure to delete the record
        if(confirm("Are you sure?")){
     
            $http({
                method: 'POST',
                data: { 'id' : id },
                url: 'api/product/delete.php'
            }).then(function successCallback(response) {
     
                // tell the user product was deleted
                Materialize.toast(response.data, 4000);
     
                // refresh the list
                $scope.getAll();
            });
        }
    }

    // update product record / save changes
    $scope.updateProduct = function(){
        $http({
            method: 'POST',
            data: {
                'id' : $scope.id,
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price
            },
            url: 'api/product/update.php'
        }).then(function successCallback(response) {
     
            // tell the user product record was updated
            Materialize.toast(response.data, 4000);
     
            // close modal
            $('#modal-product-form').modal('close');
     
            // clear modal content
            $scope.clearForm();
     
            // refresh the product list
            $scope.getAll();
        });
    }

    // retrieve record to fill out the form
    $scope.readOne = function(id){
     
        // change modal title
        $('#modal-product-title').text("Edit Product");
     
        // show udpate product button
        $('#btn-update-product').show();
     
        // show create product button
        $('#btn-create-product').hide();
     
        // post id of product to be edited
        $http({
            method: 'POST',
            data: { 'id' : id },
            url: 'api/product/read_one.php'
        }).then(function successCallback(response) {
     
            // put the values in form
            $scope.id = response.data[0]["id"];
            $scope.name = response.data[0]["name"];
            $scope.description = response.data[0]["description"];
            $scope.price = response.data[0]["price"];
     
            // show modal
            $('#modal-product-form').modal('open');
        })
        .error(function(data, status, headers, config){
            Materialize.toast('Unable to retrieve record.', 4000);
        });
    }

    // read products
    $scope.getAll = function(){
        $http({
            method: 'GET',
            url: 'api/product/read.php'
        }).then(function successCallback(response) {
            $scope.names = response.data.records;
        });
    }

    $scope.showCreateForm = function(){

        // clear form
        $scope.clearForm();

        // change modal title
        $('#modal-product-title').text("Create New Product");

        // hide update product button
        $('#btn-update-product').hide();

        // show create product button
        $('#btn-create-product').show();

    }

    // clear variable / form values
    $scope.clearForm = function(){
        $scope.id = "";
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
    }

    // create new product
    $scope.createProduct = function(){

        $http({
            method: 'POST',
            data: {
                'name' : $scope.name,
                'description' : $scope.description,
                'price' : $scope.price
            },
            url: 'api/product/create.php'
        }).then(function successCallback(response) {

            // tell the user new product was created
            Materialize.toast(response.data, 4000);

            // close modal
            $('#modal-product-form').modal('close');

            // clear modal content
            $scope.clearForm();

            // refresh the list
            $scope.getAll();
        });
    }

});