/*This Controls the flow of Posts within the page 
First Defining the structre of a post .
The contents of a post will be:
Title  topic auhor date  summary image description 
comment-array of objects{commmenter,date,commentData,rating}

average-rating
*/
monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

var productJSONData=null;
var cartJSONData=null;
var purchasedJSONData=null;
var result=new Array();
var res=new Array();

function viewProducts(arr)
{
    var n=arr.length;
    if(n==0 && document.getElementById('features').innerHTML)
    {
    	console.log("No Products are found !");
        alert("Site is under maintainance!\n We Apologize for Data access issues");
    }   
    else if(document.getElementById('features'))
    { 
    	document.getElementById('features').innerHTML="";
      var product="";
      document.getElementById('features').innerHTML='<h2 class="title text-center">Featured Items</h2>';
        for(var i=0;i<n;i++)
    	{   //var d=new Date(arr[i].date);
    		   product='<div class="col-sm-4">'+
              '<div class="product-image-wrapper">'+
                '<div class="single-products">'+
                    '<div class="productinfo text-center">'+
                      '<img src='+arr[i].pic1+' alt="" />'+
                      '<h2>'+arr[i].iName+'</h2>'+
                      '<p></p>'+
                     '</a>'+
                    '</div>'+
                    '<div class="product-overlay">'+
                      '<div class="overlay-content">'+
                       ' <h2>$'+arr[i].iCost+'</h2>'+
                        '<p>'+arr[i].iName+'</p>'+
                        '<!--<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart" onclick="addToCart('+arr.getName()+','+i+')"></i>Add to cart</a>-->'+
                        '<a onclick=" viewSingleProduct('+arr.getName()+','+i+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>View Product</a>'+
                      '</div>'+
                    '</div>'+
                '</div>'+
              '</div></div></div>';

            
            document.getElementById('features').innerHTML+=product;


    	}

   }      

                    
}

function viewSingleProduct(arr,i)
{
  

   product='<div class="col-sm-9 padding-right"><div class="product-details"><!--product-details--><div class="col-sm-5"><div class="view-product">'+
                '<img id="current-pic"'+arr[i].pic1+'alt="" />'+
              '</div><div id="images" class="slide" data-ride="carousel"><div class="carousel-inner">'+
                    '<div class="item">'+
                      '<a href=""><img id="pic1" src="'+arr[i].pic1+'"alt=""></a>'+
                      '<a href=""><img id="pic2" src="'+arr[i].pic2+'" alt=""></a>'+
                      '<a href=""><img id="pic3" src="'+arr[i].pic3+'" alt=""></a>'+
                    '</div></div><a class="left item-control" onclick="toggleImage()" data-slide="prev">'+
                  '<i class="fa fa-angle-left"></i></a><a class="right item-control" onclick="toggleImage()" data-slide="next">'+
                  '<i class="fa fa-angle-right"></i></a></div></div>'+
            '<div class="col-sm-7"><div class="product-information" id="singleproduct"><!--/product-information-->'+
                '<img src="images/product-details/new.jpg" class="newarrival" alt="" />'+
                '<h2>'+arr[i].iName+'</h2><p>Shop It! ID: '+arr[i].iId+'</p>'+
                '<img src="images/product-details/rating.png" alt="" /><span>'+
                  '<span>US $'+arr[i].iCost+'</span>'+
                  '<label>Quantity:</label>';
                  
   if(arr[i].iAvailable>0)
   {
    product+='<input id="quantity" type="text" value="1" />'+
                  '<button type="button" class="btn btn-fefault cart" onclick="return addToCart('+arr.getName()+','+i+')">'+
                   ' <i class="fa fa-shopping-cart"></i>'+
                    'Add to cart'+
                  '</button>'+
                
                '<p><b>Availability:</b>In Stock</p><p><b>Select Colour:</b> &nbsp<select id="colour" name="colour">';
    for(j=0;j<arr[i].colours.length;j++)
    {
      product+='<option>'+arr[i].colours[j]+'</option>';
    }

     product+='</select></span>';
   }
   else
   {
    product+='<input id="quantity" type="text" value="0" disabled/>'+
                  '<button type="button" class="btn btn-fefault cart" disabled>'+
                   ' <i class="fa fa-shopping-cart"></i>'+
                    'Add to cart'+
                  '</button>'+
                '</span>'+
                '<p><b>Availability:</b>Out Of Stock</p>';
   }
    product+="<p><b>Available: "+arr[i].iAvailable+"&nbsp/ &nbsp Ordered:"+arr[i].iOrdered+"</b></p>";        
    product+='<p><b>Brand:</b>'+arr[i].iBrand+'</p><br /><br /></div><!--/product-information--></div></div><!--/product-details-->'+
          '<div class="category-tab shop-details-tab"><!--category-tab--><div class="col-sm-12">'+
            '  <ul class="nav nav-tabs"><li><a href="#details" data-toggle="tab">Details</a></li><li class="active"><a href="#reviews" data-toggle="tab">Reviews</a></li></ul>'+
            '</div><div class="tab-content"><div class="tab-pane  fade" id="details" >'+arr[i].iDescription+'</div><div class="tab-pane fade" id="companyprofile">'+
              '</div><div class="tab-pane fade active in" id="reviews" ><div class="col-sm-12"><ul><li><a href=""><i class="fa fa-user"></i>SMITH</a></li>'+
                  '<li><a href=""><i class="fa fa-clock-o"></i>05:22 PM</a></li><li><a href=""><i class="fa fa-calendar-o"></i>31 MAY 2015</a></li></ul>'+
                  '<p>Great Product Awesome Price<br />Blazingly fast delivery by Shop It!.. Thumbs Up for that. Got this in less than 48 hours.Shop It delivery Service is good as usual.Good Seller.</p>'+
                '</div><div class="col-sm-12"><ul><li><a href=""><i class="fa fa-user"></i>HAEGEN</a></li>'+
                  '<li><a href=""><i class="fa fa-clock-o"></i>09:58 PM</a></li><li><a href=""><i class="fa fa-calendar-o"></i>02 APR 2015</a></li>'+
                  '</ul><p>I ordered this product. Got with in 8 days. Very good product indeed... At an affordable price.Thank you Shop It!</p>'+
                '</div><div class="col-sm-12"><ul><li><a href=""><i class="fa fa-user"></i>WILFRED</a></li><li><a href=""><i class="fa fa-clock-o"></i>12:41 AM</a></li>'+
                 ' <li><a href=""><i class="fa fa-calendar-o"></i>31 JAN 2015</a></li></ul><p>Nice job Shop It ! Its very afforable and great to have this product.</p></div>'+
              '</div></div></div>';

    document.getElementById("slider").innerHTML="";
    document.getElementById("features").innerHTML=product;
    console.log("Site is OK!");
    document.getElementById("details").innerHTML='<div class="col-sm-12">'+arr[i].iDescription+'</div>';
    document.getElementById("current-pic").src=arr[i].pic1;
    document.getElementById("pic1").src=arr[i].pic1;
    document.getElementById("pic2").src=arr[i].pic2;
    document.getElementById("pic3").src=arr[i].pic3;
 
    
}

function toggleImage()
{
  currentImg=document.getElementById("current-pic").src;
  p1=document.getElementById("pic1").src;
  p2=document.getElementById("pic2").src;
  p3=document.getElementById("pic3").src;

  if(currentImg===p1)
  {
   document.getElementById("current-pic").src=p2; 
  }
  if(currentImg===p2)
  {
    document.getElementById("current-pic").src=p3; 
  }
  if(currentImg===p3)
  {
    document.getElementById("current-pic").src=p1;
  }

}

function addToCart(arr,index)
{
  var qty=document.getElementById("quantity").value;
  var clr=document.getElementById("colour").value;

  if(qty===null)
  {
    qty=1;
  }
  
  var ca=new Object();
  var user=localStorage.getItem("loggedUser");

  ca.iId=arr[index].iId;

  if(user===null ||user==="null")
  {
    ca.cId="guest";
    user="Guest";
  }  
  else
  {
    ca.cId=localStorage.getItem("loggedUser");
  }

  if(qty>arr[index].iAvailable)
  {
    alert("Dear "+user+", \n Please limit your order to the available quantity");
    return false;
  }
  ca.quantity=qty;
  ca.colour=clr;
  //Pushing into the cart .

  cart.push(ca);
  cartJSONData=JSON.stringify(cart);
  writeFile('writeCart',cartJSONData);

  alert('Thank you '+user+' for your order!\n The Item has been added to your cart!\n\nPlease continue Shopping ...\nYou will be redirected to the home page..');
  window.location="index.html";
  return false;  


}

 

function addProducts()
{
    var iChars = "~!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    var newProductFormObj = document.forms['newProductForm'];
    
    var alerttext="";

    var pname=newProductFormObj.elements.namedItem("productname").value;
	 var pid=newProductFormObj.elements.namedItem("productid").value;
	 var author=localStorage.getItem("loggedUser");
	 var date=new Date();
	 var bname=newProductFormObj.elements.namedItem("productbrand").value;
   var pdesc=newProductFormObj.elements.namedItem("productdesc").value;
   var ptype=newProductFormObj.elements.namedItem("producttype").value;
   var pcost=newProductFormObj.elements.namedItem("productcost").value;  



	 var image1=newProductFormObj.elements.namedItem("productimg1").value;
   var image2=newProductFormObj.elements.namedItem("productimg2").value;
   var image3=newProductFormObj.elements.namedItem("productimg3").value;
  
   var avail=newProductFormObj.elements.namedItem("productavail").value;
   var ordered=newProductFormObj.elements.namedItem("productorder").value;
   var colours=newProductFormObj.elements.namedItem("productcolours").value;

   var user=localStorage.getItem("loggedUser");

    if(user==null || user=="null")
    {
    	alert("Please Login or SignUp as admin to add new Products !");
    	window.location="index.html";
    	return false;
    }

    if( (pname.indexOf("iChars") != -1) || (pid.indexOf("iChars") != -1)  )
    {
    	alerttext+="The Post Title or the Post Topic cannot include the characters"+
    	          "!, @, #, $, %, ^, &, *, (, ), \", /, \\, -, ~,";
    }   	

    if( (image1.indexOf("http://") === -1) || (image2.indexOf("http://") === -1)|| (image3.indexOf("http://") === -1)   )
    {
    	alerttext+="The Image file must be a Http Url...";
    	
    }
    
    if(alerttext!="")
    {
    	alert(alerttext);
    	return false;
    } 
    if(alerttext==="")
    {

    var prd={};
     prd.iId=pid;
     prd.iName=pname;
     prd.iDescription=pdesc;
     prd.iBrand=bname;
     prd.iCost=pcost;
     prd.iType=ptype;
     prd.pic1=image1;
     prd.pic2=image2;
     prd.pic3=image3;
     prd.iAvailable=avail;
     prd.iOrdered=ordered;
     prd.colours=colours.split(',');
     prd.date=date;
     

     //Call the Read method to check for exsisting data and store it in JSONData
     
     console.log("Reading from file JS....");

     

     if(customers.length===0)
     { 
      products=new Array();
      products.push(prd);	
      console.log("1st Product  is ... "+prd.iName);
     }
     else
     {
       console.log("Not the first product \n Showing Last post Title and Author \n");
       //forumPosts[forumPosts.length-1].ptitle+"\n"+forumPosts[forumPosts.length-1].author);
       products.push(prd);
     }
     //Writing Data to the file
      productJSONData=JSON.stringify(products);
      writeFile('writeProducts',productJSONData);
     alert("Dear, "+user+"\n You have added your new Product succesfully \nProceed to your Home page.....");     
     window.location.href="index.html";
     //location.reload();
     return false;
    }

}


function checkoutCalculator()
{
  document.getElementById('checkout').innerHTML='';
  var flag=0;
  var totalcost=0;
  var procheck='<div class="table-responsive cart_info"><table class="table table-condensed"><thead>'+
            '<tr class="cart_menu"><td class="image">Item</td><td class="description"></td><td class="price">Price</td>'+
            '<td class="quantity">Quantity</td><td class="total">Total</td><td></td></tr></thead>';
  
  

  var n=cart.length;
  var mindex=-1;
  var user=localStorage.getItem("loggedUser");

  //Redirecting to Login page for guest Signup
  if(user==="null" || user===null ) //check if regguest id is present only then modify it
  {
    if(document.getElementById("regguest")){document.getElementById("regguest").innerHTML="<a href='login.html'>Register Now!</a>";}
    user="guest";
  }
  else if(document.getElementById("nonreg")) //check if regguest id is present only then modify it
  {
    document.getElementById("nonreg").innerHTML="";

    for(var i=0;i<customers.length;i++)
    {
     if(customers[i].username===user && document.getElementById("address"))
     {
      document.getElementById("address").innerHTML="<textarea placeholder='"+customers[i].address+"' rows='16'></textarea>";
      break;
     }
    }
    
  }


  for(var i=0;i<n;i++)
  { 
    if(user===cart[i].cId)
    {
      flag=1;
      for(var j=0;j<products.length;j++)
      {
        if(cart[i].iId===products[j].iId && mindex!=j)
        { mindex=j;
          if(flag===1)
          {
           procheck+='<tbody><tr><td class="cart_product"><a href=""><img src="'+products[mindex].pic1+'" alt="" width="110" height="110"></a></td>'+
              '<td class="cart_description"><h4><a href="">'+products[mindex].iName+'</a></h4><p>Shop It! ID:&nbsp'+products[mindex].iId+
              '</p><h6> Colour:'+cart[i].colour+'</h6></td><td class="cart_price"><p>$'+products[mindex].iCost+'</p></td><td class="cart_quantity"><div class="cart_quantity_button">'+
              '<input class="cart_quantity_input" type="text" name="quantity" value="'+cart[i].quantity+'" autocomplete="off" size="5" disabled="disabled">'+
               '</div></td><td class="cart_total"><p class="cart_total_price">'+parseInt(products[mindex].iCost*cart[i].quantity)+
               '</p></td><td class="cart_delete"><a class="cart_quantity_delete" onclick="deleteFromCart('+i+')"><i class="fa fa-times"></i></a></td></tr>'+
                '<tr><td colspan="4">&nbsp;</td><td colspan="2">';
           totalcost+=parseInt(products[mindex].iCost*cart[i].quantity);
          }
        }
      }
    }                  
  }
  if(flag===0)
  {
    procheck+="<h2><center>No Item Purchased !</center></h2>";
    procheck+='<table class="table table-condensed total-result"><tr><td>Cart Sub Total</td><td>$ &nbsp'+totalcost+'</td></tr>'+
              '<tr><td>Tax</td><td>$2</td></tr><tr class="shipping-cost"><td>Shipping Cost</td><td>Free</td></tr>'+
                '<tr><td>Total</td><td><span>$ &nbsp'+parseInt(totalcost)+'</span></td></tr></table></td></tr></tbody></table>';
  
  }
  else
  {
    procheck+='<table class="table table-condensed total-result"><tr><td>Cart Sub Total</td><td>$ &nbsp'+totalcost+'</td></tr>'+
              '<tr><td>Tax</td><td>$2</td></tr><tr class="shipping-cost"><td>Shipping Cost</td><td>Free</td></tr>'+
                '<tr><td>Total</td><td><span>$ &nbsp'+parseInt(totalcost+2)+'</span></td></tr></table></td></tr></tbody></table>';
  }
  document.getElementById("checkout").innerHTML=procheck;                          
}


function deleteFromCart(item)
{
  var d=prompt("Are you Sure?\nType yes to confirm");
  if(d==="yes"|| d==="Yes"|| d=== "YES")
    { 
     cart.splice(item, 1);
     alert("The item is successfully deleted from the cart!");
     cartJSONData=JSON.stringify(cart);
     writeFile('writeCart',cartJSONData);
     location.reload();
    }
  else
  { alert("The item is NOT deleted from your cart! Be Happy :) !");}
  

}


function buyNow()
{
 var user=localStorage.getItem("loggedUser");

 if(user===null || user=== "null"){user="guest";}

 
 var n=cart.length;
 var indexes=[];
 for(var i=0;i<n;i++)
 {
  if(cart[i].cId===user)//Pushing the entire cart data into purchased array.
  {
   purchased.push(cart[i]);
   indexes.push(i);
  }
 }

  //Updating the number of items ordered and number of items available
  for(var j=0;j<indexes.length;j++)
  { 
    for(var i=0;i<products.length;i++)
    {
     if(products[i].iId===cart[j].iId)
     {
      products[i].iAvailable-=parseInt(cart[j].quantity);
      products[i].iOrdered+=parseInt(cart[j].quantity);
     }
    }
  }
 //Deleting items from Cart.
 for(var j=0;j<indexes.length;j++)
 {
  cart.splice(indexes[j]);
 }

 //Writing updated information to the file.
 purchasedJSONData=JSON.stringify(purchased);
 writeFile("writePurchased",purchasedJSONData);
 console.log("Wrote purchase history...");

 cartJSONData=JSON.stringify(cart);
 writeFile('writeCart',cartJSONData);
 console.log("Updated Inventory ...");
 productJSONData=JSON.stringify(products);
 writeFile('writeProducts',productJSONData);
 
 alert("Dear "+user+",\n Thank you for Purchasing your goods with Shop It!\n\nYour products will arrive "+
          "in the address mentioned within 3-7 business days...\n\n\nYou will be redirected to the Home page....");

  window.location="index.html";
  loadJS();
  return false;
}


function deleteProducts()
{
  if(localStorage.getItem("loggedUser")!="admin")
    {
    alert("You are not authorized to delete products in the Website !");
      return false;
    }
 
    var n=products.length;
    var flag=false;


    document.getElementById('features').innerHTML='<h2 class="title text-center">Delete Products</h2>';
    for(var i=0;i<n;i++)
      {   //var d=new Date(arr[i].date);
           product='<div class="col-sm-4">'+
              '<div class="product-image-wrapper">'+
                '<div class="single-products">'+
                    '<div class="productinfo text-center">'+
                      '<img src='+products[i].pic1+' alt="" />'+
                      '<h2>'+products[i].iName+'</h2>'+
                      '<p></p>'+
                     '</a>'+
                    '</div>'+
                    '<div class="product-overlay">'+
                      '<div class="overlay-content">'+
                       ' <h2>$'+products[i].iCost+'</h2>'+
                        '<p>'+products[i].iName+'</p>'+
                        '<a class="btn btn-default add-to-cart" onclick="deleteIt('+i+')"><i class="fa fa-crosshairs" onclick=""></i>Delete It Now!</a>-->'+
                      '</div>'+
                    '</div>'+
                '</div>'+
              '</div></div></div>';

            
            document.getElementById('features').innerHTML+=product;


      }
    
}


function deleteIt(item)
{
  
  var d=prompt("Are you Sure?\nType yes to confirm");
  if(d==="yes"|| d==="Yes"|| d=== "YES")
    {products.splice(item, 1);
     alert("The Post is successfully deleted !");
     productJSONData=JSON.stringify(products);
     writeFile('writeProducts',productJSONData);
     loadJS();
    }
  else
  { alert("The Post is NOT deleted  Be Happy :) !");}
}


function inventory()
{
 if(localStorage.getItem("loggedUser")!="admin")
    {
    alert("You are not authorized to delete products in the Website !");
      return false;
    }
 
    var n=products.length;
    var flag=false;
    var proinvent='';


    document.getElementById('features').innerHTML='<h2 class="title text-center">Product Inventory</h2>';
    var proinvent='<div class="table-responsive cart_info"><table class="table table-condensed"><thead>'+
            '<tr class="cart_menu"><td class="image">Item</td><td class="description"></td><td class="price">Price</td>'+
            '<td class="quantity">Quantity Available </td><td class="quantity"> Quantity Ordered</td><td></td></tr></thead>';
    for(var i=0;i<products.length;i++)
    {
      proinvent+='<tbody><tr><td class="cart_product" rows="9"><a href=""><img src="'+products[i].pic1+'" alt="" width="110" height="110"></a></td>'+
              '<td class="cart_description" align="center"><h4><a href="">'+products[i].iName+'</a></h4><p>Shop It! &nbsp ID:&nbsp'+products[i].iId+
              '</p><h6> Colours Available: </h6><select style="width:auto !important;display: inline-block;">';
      for(j=0;j<products[i].colours.length;j++)
      {
      proinvent+='<option>'+products[i].colours[j]+'</option>';
      }

     proinvent+='</select></span></td><td class="cart_price"><p>$'+products[i].iCost+'</p></td><td class="cart_quantity"><div class="cart_quantity_button">'+
              '<input class="cart_quantity_input" type="text" name="quantity" value="'+products[i].iAvailable+'" autocomplete="off" size="5" disabled="disabled">'+
               '</div</td><td class="cart_quantity"><div class="cart_quantity_button"><input class="cart_quantity_input" type="text" name="quantity" value="'+products[i].iOrdered+'" autocomplete="off" size="5" disabled="disabled">'+
               '</div></p></td></tr>'+
                '<tr><td colspan="4">&nbsp;</td><td colspan="2">';
    }
    proinvent+='</tbody></table></div>';
    document.getElementById('features').innerHTML+=proinvent;
}


function userOrderHistory()
{
 if(localStorage.getItem("loggedUser")!="admin")
    {
    alert("You are not authorized to view Previous Purchase history of other customers !");
      return false;
    }
 
    var n=products.length;
    var flag=false;
    var history='';


    document.getElementById('features').innerHTML='<h2 class="title text-center">Purchase History</h2>';

    users=purchased.getUnique('cId');
    if(users===null || users.length===0)
      {document.getElementById('features').innerHTML+="<h4><center>There are No purchases done at Shop It! yet...</center>";}

    for(var i=0;i<users.length;i++)
    {
      document.getElementById('features').innerHTML+='<h5 class="title text-center">'+users[i].toUpperCase()+'</h5>';
      var history='<div class="table-responsive cart_info"><table class="table table-condensed"><thead>'+
            '<tr class="cart_menu"><td class="image">Item</td><td class="description"></td><td class="price">Price</td>'+
            '<td class="quantity">Quantity Ordered </td><td class="quantity">Quantity Remaining In Stock</td><td></td></tr></thead>';
      for(var j=0;j<purchased.length;j++)
      {
       if(purchased[j].cId===users[i]) //For each distinct user in the purchased array, display his cart.
        {
          for(var k=0;k<products.length;k++) //Display the excat product details using the Product Id.
          {
            if(purchased[j].iId===products[k].iId)
            {
              history+='<tbody><tr><td class="cart_product" rows="9"><a href=""><img src="'+products[k].pic1+'" alt="" width="110" height="110"></a></td>'+
              '<td class="cart_description" align="center"><h4><a href="">'+products[k].iName+'</a></h4><p>Shop It! ID:&nbsp'+products[k].iId+
              '</p><h6>Selected Colour:&nbsp'+purchased[j].colour+'</h6></td><td class="cart_price"><p>$'+products[k].iCost+'</p></td><td class="cart_quantity"><div class="cart_quantity_button">'+
              '<input class="cart_quantity_input" type="text" name="quantity" value="'+purchased[j].quantity+'" autocomplete="off" size="5" disabled="disabled">'+
               '</div</td><td class="cart_quantity"><div class="cart_quantity_button"><input class="cart_quantity_input" type="text" name="quantity" value="'+products[k].iAvailable+'" autocomplete="off" size="5" disabled="disabled">'+
               '</div></p></td></tr>'+
                '<tr><td colspan="4">&nbsp;</td><td colspan="2"></tr>';
            }
          }
          
        }
      }
      history+='</tbody></table></div>';
      document.getElementById('features').innerHTML+=history;
    }
    
}


function searchProducts(keyword)
{   
	var flag=false;
	//var keyword=document.getElementById("searchquery").value;
    var product="";
    result=[];

	if(keyword==="")
	{   alert("Provide a Query to search !"); 
		return false;
	}

   
	var n=products.length;
	console.log("keyword"+keyword);
	keyword=keyword.toLowerCase();
	for (var i=0;i<n;i++)
	{
		if( (products[i].iBrand.toLowerCase().indexOf(keyword)!=-1) || 
			(products[i].iType.toLowerCase().indexOf(keyword)!=-1) || 
			(products[i].iName.toLowerCase().indexOf(keyword)!=-1) )
		{
			flag=true;
			result.push(products[i]);
			console.log("Searching  success \nItem: "+products[i]);

		}
	}
	if(flag===false)
	{
		alert("No product found!");
    document.getElementById('features').innerHTML='<h2 class="title text-center">Filtered Products</h2><br /><h4><center>No Products Found! </center></h4>';
    return false;

	}
	document.getElementById('features').innerHTML='<h2 class="title text-center">Filtered Products</h2>';
  n=result.length;

  for(var i=0;i<n;i++)
  {   //var d=new Date(arr[i].date);
     product+='<div class="col-sm-4">'+
              '<div class="product-image-wrapper">'+
                '<div class="single-products">'+
                    '<div class="productinfo text-center">'+
                      '<img src='+result[i].pic1+' alt="" />'+
                      '<h2>'+result[i].iName+'</h2>'+
                      '<p></p>'+
                     '</a>'+
                    '</div>'+
                    '<div class="product-overlay">'+
                      '<div class="overlay-content">'+
                       ' <h2>$'+result[i].iCost+'</h2>'+
                        '<p>'+result[i].iName+'</p>'+
                        '<!--<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart" onclick="addToCart('+result.getName()+','+i+')"></i>Add to cart</a>-->'+
                        '<a onclick=" viewSingleProduct('+result.getName()+','+i+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>View Product</a>'+
                      '</div>'+
                    '</div>'+
                '</div>'+
              '</div></div></div>';

     }
     document.getElementById('features').innerHTML+=product;
     return  false;  
    
}


function priceSearch()
{
  var r=document.getElementById("sl2").value;
  range=r.split(',');
  var flag=false;
  var pro="";
   
  result=[];

  for(var i=0; i<products.length; i++)
  {
   if(parseInt(products[i].iCost)>=parseInt(range[0]) && parseInt(products[i].iCost) <=parseInt(range[1]))
   {
    result.push(products[i]);
    flag=true;
   }
  }
  if(flag===false)
  {
    alert("No product found in the Price Range!");
    document.getElementById('features').innerHTML='<h2 class="title text-center">Filtered Products</h2><br /><h4><center>No Products Found in the Price Range ! </center></h4>';
    return false;

  }
  
  
  document.getElementById('features').innerHTML='<h2 class="title text-center">Filtered Products</h2>';
  var n=result.length;
  for(var i=0;i<n;i++)
  {   //var d=new Date(arr[i].date);
     pro+='<div class="col-sm-4">'+
              '<div class="product-image-wrapper">'+
                '<div class="single-products">'+
                    '<div class="productinfo text-center">'+
                      '<img src='+result[i].pic1+' alt="" />'+
                      '<h2>'+result[i].iName+'</h2>'+
                      '<p></p>'+
                     '</a>'+
                    '</div>'+
                    '<div class="product-overlay">'+
                      '<div class="overlay-content">'+
                       ' <h2>$'+result[i].iCost+'</h2>'+
                        '<p>'+result[i].iName+'</p>'+
                        '<!--<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart" onclick="addToCart('+result.getName()+','+i+')"></i>Add to cart</a>-->'+
                        '<a onclick=" viewSingleProduct('+result.getName()+','+i+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>View Product</a>'+
                      '</div>'+
                    '</div>'+
                '</div>'+
              '</div></div></div>';

     }
     document.getElementById('features').innerHTML+=pro;
     return  false;  

}


function viewBrands()
{
  var brands=products.getUnique('iBrand');
  if(document.getElementById("brands"))
  {
    document.getElementById("brands").innerHTML="";
   for(var i=0;i<brands.length;i++)
   {
    document.getElementById("brands").innerHTML+='<li><a onclick="searchProducts(\''+brands[i]+'\')">'+brands[i]+'</a></li>';
   }
  }
}

function viewCategories()
{
  var categories=products.getUnique('iType');
  if(document.getElementById("accordian"))
  {
   document.getElementById("accordian").innerHTML="";
   for(var i=0;i<categories.length;i++)
   {
     document.getElementById("accordian").innerHTML+='<div class="panel panel-default">'+
                                                     '<div class="panel-heading">'+
                                                         '<h4 class="panel-title"><a onclick="searchProducts(\''+categories[i]+'\')">'+categories[i]+'</a></h4>'+
                                                       '</div></div>';
   }
  }
   document.getElementById("latestproducts").innerHTML="";
   for(var i=0;i<categories.length;i++)
   {
     document.getElementById("latestproducts").innerHTML+='<li><a onclick="searchProducts(\''+categories[i]+'\')">'+categories[i]+'</a></li>';
   }


}


function loadJS()
   {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'js/products.js';
      head.appendChild(script);
      script.src= 'js/customers.js';
      head.appendChild(script);
   }
   


function recentPosts()
{
  res=new Array();
  res=JSON.parse(JSON.stringify(forumPosts));
  res=res.sort(function(a,b){
         var c = new Date(a.date);
         var d = new Date(b.date);
         return d-c;});
  viewPosts(res);
}

function recentComments()
{
  res=new Array();
  res=JSON.parse(JSON.stringify(forumPosts));
  res=res.sort(function(a,b){
         var c = new Date(a.comment.date);
         var d = new Date(b.comment.date);
         return d-c;});
  viewPosts(res);
}

function recentSidePosts()
{
  res=new Array();
  var recent="";
  res=JSON.parse(JSON.stringify(forumPosts));
  res=res.sort(function(a,b){
         var c = new Date(a.date);
         var d = new Date(b.date);
         return d-c;});
  if(res.length!=0)
  {
  	document.getElementById("recentPosts").innerHTML="";
    for(var i=0;i<res.length;i++)
    {
      recent+='<li><a href="#" onclick="viewSinglePost(res'+','+i+')">'+res[i].ptitle+'</a></li>';
     }
    document.getElementById("recentPosts").innerHTML=recent;
  }
}

function isNumber(o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}


Array.prototype.getName = function () { 
  var prop; 
  for (prop in self) {
     if (Object.prototype.hasOwnProperty.call(self, prop) && self[prop] === this && self[prop].constructor == this.constructor) { 
       return prop; 
     } 
  } 
  return ""; // no name found 
}

//Used to obtain unique elements in an array
Array.prototype.getUnique = function(property){
   var u = {}, a = [],b;
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i][property])) {
         continue;
      }
      b=this[i][property]; //selecting the property from an array of objects like this[i].'property'
      a.push(b);
      u[this[i][property]] = 1;
   }
   return a;
}
