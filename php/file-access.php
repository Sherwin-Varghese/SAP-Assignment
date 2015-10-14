<?php
header('Content-Type: application/json');
echo json_encode((object) array('success'=>true));

//Windows and Linux have different directory sturctures for thhe server.
/*if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') 
{*/
    switch ($_POST['operation'] ) {
    case 'writeUsers':
        file_put_contents('C:\xampp\htdocs\shopit\js\customers.js', "customers=".$_POST['json']);

        break;
    case 'read':
        $data = file_get_contents('C:\xampp\htdocs\shopit\js\users.js');
        echo $data;
        break;
    case 'writeProducts':
        file_put_contents('C:\xampp\htdocs\shopit\js\products.js', "products=".$_POST['json']);

        break;    
    case 'writeCart':
        file_put_contents('C:\xampp\htdocs\shopit\js\cart.js', "cart=".$_POST['json']);

        break; 
    case 'writePurchased':
        file_put_contents('C:\xampp\htdocs\shopit\js\purchased.js', "purchased=".$_POST['json']);

        break;     
//}

    
/*
else //Assuming linux /var/www/
 {
    switch ($_POST['operation'] ) {
    case 'writeUsers':
        file_put_contents('/var/www/html/shopit/js/customers.js', "customers=".$_POST['json']);

        break;
    case 'read':
        $data = file_get_contents('/var/www/html/shopit/js/users.js');
        echo $data;
        break;
    case 'writeProducts':
        file_put_contents('/var/www/html/shopit/js/products.js', "products=".$_POST['json']);

        break;    
    case 'writeCart':
        file_put_contents('/var/www/html/shopit/js/cart.js', "cart=".$_POST['json']);

        break; 
    case 'writePurchased':
        file_put_contents('/var/www/html/shopit/js/purchased.js', "purchased=".$_POST['json']);

        break;     
}*/

}

?>

 