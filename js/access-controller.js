var userJSONData=null;


function validateSignUp()
{   //Special Character Validation
	

    var iChars = "~!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    var signUpFormObj = document.forms['signUpForm'];
    
    var alerttext="";

    var fname=signUpFormObj.elements.namedItem("fullname").value;
	  var uname=signUpFormObj.elements.namedItem("cname").value;
	  var pword=signUpFormObj.elements.namedItem("password").value;
	  var repword=signUpFormObj.elements.namedItem("repassword").value;
	  var mob=signUpFormObj.elements.namedItem("mobile").value;
	  var add=signUpFormObj.elements.namedItem("address").value;
	  var email=signUpFormObj.elements.namedItem("email").value;
	  var secq=signUpFormObj.elements.namedItem("secq").value;
    var seca=signUpFormObj.elements.namedItem("seca").value;
    
    console.log(uname);
    if( (uname.indexOf(" ") != -1) || uname.length>8 || (uname.indexOf("iChars") != -1) )
    {
    	 alerttext+="Please avoid special characters !, @, #, $, %, ^, &, *, (, ), \", /, \\, -, ~,"+
    	  "white spaces and limit Username to 8 characters\n\n";
    }
     if( pword===repword && pword.length<6 )
    {
    	 alerttext+="Please provide a longer password... \n\n";
    }

    if( pword!= repword )
    {
    	 alerttext+="Passwords donot Match.... \n\n";
    }

    if(!isNumber(mob) )
    {
       alerttext+="Please provide a valid mobile number... \n\n";
    }
   
   
    if(alerttext!=""){alert(alerttext); return false;}

    if(alerttext==="") //Form is Valid
    {         //Storing UserData to a file.
     //var f1=new file("userdata.jar");
     var dat={};
     dat.fullname=fname;
     dat.username=uname;
     dat.password=pword;
     dat.mobile=mob;
     dat.address=add;
     dat.email=email;
     dat.secq=secq;
     dat.seca=seca;
    


     //Call the Read method to check for exsisting data and store it in userJSONData
     
     console.log("Reading from file JS....");

     

     if(customers.length===0)
     { 
      customers=new Array();
      customers.push(dat);	
      console.log("Fresh Entry 1st user  "+customers);
     }
     else
     {
       console.log("FULL DATA :"+customers);
       customers.push(dat);
     }
     //Writing Data to the file
      userJSONData=JSON.stringify(customers);
      writeFile('writeUsers',userJSONData);
      alert("Thank you for Signing Up to Shop It ! You will be redirected to the home page.");    
      
     
     window.location.href="index.html";
     //location.reload();
     return false;
    }
}

function validateLogin()
{    
     var signUpFormObj = document.forms['loginForm'];
     var uname=signUpFormObj.elements.namedItem("cname").value;
     var passw=signUpFormObj.elements.namedItem("password").value;

     var alerttext="";

     if(customers.length===0)
     { 
      console.log("No customers are currently Registered !");
      alert("Access Login only after registration !");
     }
     else
     {

       var n=customers.length;
       var flag=false;

       console.log("Length: "+n);
       for(var i=0;i<n;i++)
       {
         if(customers[i].username===uname || customers[i].email===uname)
         {   
         	if(customers[i].password===passw)
         	{
              alert(" Welcome to Shop It !, "+uname);
              localStorage.setItem('loggedUser',uname);
              console.log("Logged the user! :)");
              location.reload();
              flag=true;
              window.location.href="index.html";
              return false;
         	}
         }
       }
       if(flag==false){alert("Invalid Username or Password ! Try again !");}
       
 
     }	    
    
}

function loadData()
{
	var user=localStorage.getItem("loggedUser");
	if(user==="null" || user===null)
	{
	 document.getElementById("top-panel").innerHTML=
              '<ul class="nav navbar-nav">'+
                '<li><a href="#"><i class="fa fa-user"></i>Guest</a></li>'+
                '<li><a href="checkout.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>'+
                '<li><a href="cart.html"><i class="fa fa-shopping-cart"></i> Cart</a></li>'+
                '<li><a href="login.html"><i class="fa fa-lock"></i> Login</a></li>'+
              '</ul>';
	}	
  else if(user==="admin")
  {

   document.getElementById("top-panel").innerHTML=
              '<ul class="nav navbar-nav">'+
                '<li><a href="#"><i class="fa fa-user"></i>'+user+'</a></li>'+
                '<li><a href="addproducts.html"><i class="fa fa-crosshairs"></i> Add Products</a></li>'+
                '<li><a onclick="deleteProducts()"><i class="fa fa-crosshairs"></i> Delete Products</a></li>'+
                '<li><a onclick="inventory()"><i class="fa fa-crosshairs"></i> Inventory</a></li>'+
                '<li><a onclick="userOrderHistory()"><i class="fa fa-crosshairs"></i> User Order History</a></li>'+
                '<li><a href="checkout.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>'+
                '<li><a href="cart.html"><i class="fa fa-shopping-cart"></i> Cart</a></li>'+
                '<li><a href="#" onclick="logOut()"><i class="fa fa-lock"></i> Logout</a></li>'+
              '</ul>';
  }
	else
	{
	 	
	 document.getElementById("top-panel").innerHTML=
              '<ul class="nav navbar-nav">'+
                '<li><a href="#"><i class="fa fa-user"></i>'+user+'</a></li>'+
                '<li><a href="checkout.html"><i class="fa fa-crosshairs"></i> Checkout</a></li>'+
                '<li><a href="cart.html"><i class="fa fa-shopping-cart"></i> Cart</a></li>'+
                '<li><a href="#" onclick="logOut()"><i class="fa fa-lock"></i> Logout</a></li>'+
              '</ul>';
   
	}	

	viewProducts(products);
  viewBrands();
  viewCategories();
  loadJS();
  

}

function logOut()
{
	localStorage.setItem("loggedUser",null);
  localStorage.clear();
    location.reload();
}




function givePass()
{
  var recoveryFormObj=document.forms['recoveryForm'];
  var flag=false;

  var uname=recoveryFormObj.elements.namedItem("uname").value;
  var secq=recoveryFormObj.elements.namedItem("secq").value;
  var seca=recoveryFormObj.elements.namedItem("seca").value;
  
 
  for(var i=0;i<forumUsers.length;i++)
  {
    if(uname===forumUsers[i].username && secq.toLowerCase()===forumUsers[i].secq.toLowerCase() && 
       seca.toLowerCase()===forumUsers[i].seca.toLowerCase())
    {
     flag=true;
      break;
    }
  }
  if(flag==false)
  {
    alert("User does not exist or Security Credentials are wrong ! \nTry again !");
  }
  else
  {
     //document.getElementById("poster").innerHTML="";
     document.getElementById("poster").innerHTML='<form id="newPasswordForm" action="" onsumbit="document.getElementById("newPasswordForm").submit()"'+
                      '" method="post">PASSWORD RESET<br /><label for="password">New Password: <input type="password" class="text" name="password"'+
                      ' placeholder="Provide a strong Password (min.6 characters)" ></label><label for="repassword">Repeat Password: <input type="password"'+
                      ' class="text" name="repassword" placeholder="Repeat the password " required></label><input type="submit"'+
                      ' style="margin-left:75%; margin-top:3%" value="Change Password"></label>';;
    
    //document.getElementById("newPasswordForm").submit();
    $(function() {
    $('#newPasswordForm').submit(function() {
        var newPassForm=document.forms['newPasswordForm'];
        var pass=newPassForm.elements.namedItem("password").value;
        var repass=newPassForm.elements.namedItem("repassword").value;
     
       if(pass!=repass || pass.length<6)
       {alert("\nPasswords donot match or Pasword is less than 6 characters ! Repeat the same password! ");
       return false;}
      else
      {
       forumUsers[i].password=pass;
       alert("Password updated Successfully! \n Redirecting to Login Page");
       userJSONData=JSON.stringify(forumUsers);
       writeFile('writeUsers',userJSONData);
       window.location="index.html";
       return false; 
      }
      });
    });

    
  }
  
}

/*
function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Shop It!";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="alert.ok()">OK</button>';
    }
  this.ok = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}
var alert = new CustomAlert();

/*function CustomConfirm(){
  this.render = function(dialog,op,id){
    var winW = window.innerWidth;
      var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
      dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (550 * .5)+"px";
      dialogbox.style.top = "100px";
      dialogbox.style.display = "block";
    
    document.getElementById('dialogboxhead').innerHTML = "Confirm that action";
      document.getElementById('dialogboxbody').innerHTML = dialog;
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Confirm.yes(\''+op+'\',\''+id+'\')">Yes</button> <button onclick="Confirm.no()">No</button>';
  }
  this.no = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
  this.yes = function(op,id){
    if(op == "delete_post"){
      deletePost(id);
    }
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }
}
var confirm = new CustomConfirm();

function CustomPrompt(){
  this.render = function(dialog,func){
    var winW = window.innerWidth;
      var winH = window.innerHeight;
    var dialogoverlay = document.getElementById('dialogoverlay');
      var dialogbox = document.getElementById('dialogbox');
    dialogoverlay.style.display = "block";
      dialogoverlay.style.height = winH+"px";
    dialogbox.style.left = (winW/2) - (550 * .5)+"px";
      dialogbox.style.top = "100px";
      dialogbox.style.display = "block";
    document.getElementById('dialogboxhead').innerHTML = "A value is required";
      document.getElementById('dialogboxbody').innerHTML = dialog;
    document.getElementById('dialogboxbody').innerHTML += '<br><input id="prompt_value1">';
    document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Prompt.ok(\''+func+'\')">OK</button> <button onclick="Prompt.cancel()">Cancel</button>';
  }
  this.cancel = function(){
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";

  }
  this.ok = function(func){
    var prompt_value1 = document.getElementById('prompt_value1').value;
    window[func](prompt_value1);
    d=prompt_value1;
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
     
  }
}
var prompt = new CustomPrompt();
*/
function writeFile(op,JSONData)
{   console.log(op);

// Writing User details into users.js usinng AJAX---- utter fail
    /*$.ajax({
    type: "POST",
    url: 'http://localhost/discussion-forum/assets/php/file-access.php',
    beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Accept","application/json");
        },
    cache: false,
    dataType:'json',
    data: {operation: op,
        json: JSONData},
    async:false,
    success: function(){console.log("Writing OK");}, 
    error: function () {alert('Failed to write data.' + op);}
  });*/
 

   $.ajax({
  type: "POST",
  dataType: "json",
  url: "http://localhost/shopit/php/file-access.php", 
   data: {operation:op,json:JSONData},
  success: function(){console.log("Writing OK");}, 
  error: function () {alert('Failed to write data.'+op);}
  });

  /*//Writing to file using custom invisible form.
  document.getElementById("documentWriter").innerHTML+='<form name="writerForm" action="http://localhost/discussion-forum/assets/php/file-access.php"'+
                ' method="post" id="test"><input type="hidden"'+
               'name="operation" value="'+op+'"><input type="hidden" name="json" value="'+JSONData+
               '""></form>';
  document.getElementById("test").submit();
  //window.location="index.html";*/
}