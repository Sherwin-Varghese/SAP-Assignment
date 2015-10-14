/*This Controls the flow of Posts within the page 
First Defining the structre of a post .
The contents of a post will be:
Title  topic auhor date  summary image description 
comment-array of objects{commmenter,date,commentData,rating}

average-rating
*/
monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

var postJSONData=null;
var result=new Array();
var res=new Array();

function viewProducts(arr)
{
    var n=arr.length;
    if(n==0)
    {
    	console.log("No Products are found !");
        alert("Site is under maintainance!\n We Apologize for Data access issues");
    }   
    else
    { 
    	document.getElementById('features').innerHTML="";
        for(var i=0;i<n;i++)
    	{   //var d=new Date(arr[i].date);
    		var product='<h2 class="title text-center">Features Items</h2>'+
            '<div class="col-sm-4">'+
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
                       ' <h2>'+arr[i].iCost+'</h2>'+
                        '<p>'+arr[i].iName+'</p>'+
                        '<a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>'+
                        '<a onclick="window.location="productdetails.html";viewSingleProduct('+arr.getName()+','+i+')" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>View Product</a>'+
                      '</div>'+
                    '</div>'+
                '</div>'+
              '</div>';

            
            document.getElementById('features').innerHTML+="\n"+product;


    	}

   }      

                    
}

function viewSingleProduct(arr,i)
{
  
   //window.location="product-details.html";

   product='<img src="images/product-details/new.jpg" class="newarrival" alt="" />'+
                '<h2>'+arr[i].iName+'</h2>'+
                '<p>Shop It ID: '+arr[i].iId+'</p>'+
                '<img src="images/product-details/rating.png" alt="" />'+
                '<span>'+
                  '<span>US $'+arr[i].iCost+'</span>'+
                  '<label>Quantity:</label>';
                  
   if(arr[i].iAvailable>0)
   {
    product+='<input id="quantitiy" type="text" value="1" />'+
                  '<button type="button" class="btn btn-fefault cart">'+
                   ' <i class="fa fa-shopping-cart"></i>'+
                    'Add to cart'+
                  '</button>'+
                '</span>'+
                '<p><b>Availability:</b>In Stock</p>';
   }
   else
   {
    product+='<input id="quantitiy" type="text" value="0" disabled/>'+
                  '<button type="button" class="btn btn-fefault cart">'+
                   ' <i class="fa fa-shopping-cart"></i>'+
                    'Add to cart'+
                  '</button>'+
                '</span>'+
                '<p><b>Availability:</b>Out Of Stock</p>';
   }
                 
    product+='<p><b>Brand:</b>'+arr[i].iBrand+'</p><br /><br />';
                
	  document.getElementById("singleproduct").innerHTML=product;
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

function addComment(arr,index)
{
	//index is the index of the forumPosts array.
	var commentFormObj = document.forms['commentForm'];
    
	var cmt=commentFormObj.elements.namedItem("comment").value;
	var rating=commentFormObj.elements.namedItem("rating").value;
    if(!isNumber(rating) || rating>10)
    {
    	alert("Rating must be a number less than 10")
    }
	var data={};
	data.commenter=localStorage.getItem("loggedUser");
	data.date=new Date();
	data.commentData=cmt;
	data.rating=rating;
	forumPosts[index].comment.push(data);
	avgRating(index);
	postJSONData=JSON.stringify(forumPosts);
	writeFile('writePosts',postJSONData);

}

function addPosts()
{
    var iChars = "~!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    var newPostFormObj = document.forms['newPostForm'];
    
    var alerttext="";

    var titl=newPostFormObj.elements.namedItem("title").value;
	var topic=newPostFormObj.elements.namedItem("topic").value;
	var author=localStorage.getItem("loggedUser");
	var date=new Date();
	var smry=newPostFormObj.elements.namedItem("summary").value;
	var image=newPostFormObj.elements.namedItem("imgurl").value;
    var desc=newPostFormObj.elements.namedItem("description").value;
    var comment=new Array({});

    if(author==null || author=="null")
    {
    	alert("Please Login or SignUp to add a new Post !");
    	window.location="index.html";
    	return false;
    }

    if( (titl.indexOf("iChars") != -1) || (topic.indexOf("iChars") != -1)  )
    {
    	alerttext+="The Post Title or the Post Topic cannot include the characters"+
    	          "!, @, #, $, %, ^, &, *, (, ), \", /, \\, -, ~,";
    }   	

    if( (image.indexOf("http://") == -1)   )
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

    var pst={};
     pst.ptitle=titl;
     pst.topic=topic;
     pst.author=author;
     pst.date=date;
     pst.avgrating=0;
     pst.psummary=smry;
     pst.image=image;
     pst.pdescription=desc;
     pst.comment=new Array();
     

     //Call the Read method to check for exsisting data and store it in JSONData
     
     console.log("Reading from file JS....");

     

     if(forumUsers.length===0)
     { 
      forumPosts=new Array();
      forumPosts.push(pstt);	
      console.log("1st Post user is ... "+pst.author);
     }
     else
     {
       console.log("Not the first post \n Showing Last post Title and Author \n");
       //forumPosts[forumPosts.length-1].ptitle+"\n"+forumPosts[forumPosts.length-1].author);
       forumPosts.push(pst);
     }
     //Writing Data to the file
      postJSONData=JSON.stringify(forumPosts);
      writeFile('writePosts',postJSONData);
     alert("Dear, "+author+"\n You have added your new Post succesfully \nProceed to your Home page.....");     
     window.location.href="index.html";
     //location.reload();
     return false;
    }

}

function searchPosts()
{   
	var flag=false;
	var keyword=document.getElementById("searchquery").value;

	if(keyword==="")
	{   alert("Provide a Query to search !"); 
		return false;
	}

   
	var n=forumPosts.length;
	console.log("keyword"+keyword);
	keyword=keyword.toLowerCase();
	for (var i=0;i<n;i++)
	{
		if( (forumPosts[i].ptitle.toLowerCase().indexOf(keyword)!=-1) || 
			(forumPosts[i].pdescription.toLowerCase().indexOf(keyword)!=-1) || 
			(forumPosts[i].psummary.toLowerCase().indexOf(keyword)!=-1) )
		{
			flag=true;
			result.push(forumPosts[i]);
			console.log("Searching  success \nItem: "+forumPosts[i]);

		}
	}
	if(flag===false)
	{
		alert("No record found!");
	}
	n=result.length;
	document.getElementById('poster').innerHTML='<h6 style="align:center">RESULTS</h6>';
	for(var i=0;i<n;i++)
    	{   var d=new Date(result[i].date);
    		var post=' <!-- Post -->'+
						'<article class="box post post-excerpt">'+
						'	<header>'+
							'	<h2><a href="#" onclick="viewSinglePost(result,'+i+')">'+result[i].ptitle+'</a></h2>'+
							'	<p>'+result[i].topic+'</p>'+
							'</header>'+
							'<div class="info">'+
								'<span class="date"><span class="month">'+monthNames[d.getMonth()]+'</span></span> <span class="day">'+d.getDate()+'</span><span class="year">, '+d.getFullYear()+'</span></span>'+
								'<ul class="stats">'+
									'<li><a href="#" class="icon fa-comment">'+result[i].comment.length+'</a></li>'+
									'<li><a href="#" class="icon fa-heart">'+result[i].avgrating+'</a></li>'+
								'</ul>'+
							'</div>'+
							'<a href="#" class="image featured" onclick="viewSinglePost(result,'+i+')" ><img src="'+result[i].image+'" alt=""></a>'+
							'<p class="reading">'+result[i].psummary+
							'</p>'+
						'</article>';

            
            document.getElementById('poster').innerHTML+="\n"+post;
            console.log(forumPosts[i]);
        }
     return  false;  
    
}

function editPosts()
{
    if(localStorage.getItem("loggedUser")==null || localStorage.getItem("loggedUser")=="null")
    {
 	  alert("Kindly Login to edit Posts in Colloquium");
      return false;
    }

    var n=forumPosts.length;
    var flag=false;

    document.getElementById('poster').innerHTML="";
    for(var i=0;i<n;i++)
    {
    	
    	if(forumPosts[i].author===localStorage.getItem('loggedUser') || localStorage.getItem('loggedUser')==="admin")
    	{ 
    	  flag=true;
    	  var d=new Date(forumPosts[i].date);
          var post=' <!-- Post -->'+
						'<article class="box post post-excerpt">'+
						'	<header>'+
							'	<h2><a href="#" onclick="editSinglePost('+i+')">'+forumPosts[i].ptitle+'</a></h2>'+
							'	<p>'+forumPosts[i].topic+'</p>'+
							'</header>'+
							'<div class="info">'+
								'<span class="date"><span class="month">'+monthNames[d.getMonth()]+'<span>y</span></span> <span class="day">'+d.getDate()+'</span><span class="year">, '+d.getFullYear()+'</span></span>'+
								'<ul class="stats">'+
									'<li><a href="#" class="icon fa-comment">'+forumPosts[i].comment.length+'</a></li>'+
									'<li><a href="#" class="icon fa-heart">'+forumPosts[i].avgrating+'</a></li>'+
								'</ul>'+
							'</div>'+
							'<a href="#" class="image featured" onclick="editSinglePost('+i+')" ><img src="'+forumPosts[i].image+'" alt=""></a>'+
							'<p class="reading">'+forumPosts[i].psummary+
							'</p>'+
						'</article>';

            
            document.getElementById('poster').innerHTML+="\n"+post;
         
    	}
    }
    if(flag===false)
    {
    	alert("You must author a post in order to edit it");
    	return false;
    }	


}

function editSinglePost(index)
{
    document.getElementById("poster").innerHTML='<br/ ><br /><form id="editPostForm" action="" onSubmit="return editIt('+index+')'+
                      '" method="post"><label for="title" >Post Title: <input type="text" class="text" name="title"'+
                      ' value="'+forumPosts[index].ptitle+'"></label><label for="topic">Post Topic <input type="text"'+
                      ' class="text" name="topic" value="'+forumPosts[index].topic+'" required></label>'+
                      ' <label for="summary">Brief Description: <textarea class="text" name="summary" '+
                      ' required>'+forumPosts[index].psummary+'</textarea></label>'+
                      ' <label for="imgurl">Http Url of an image related to your Post: '+
                      ' <input type="text" class="text" name="imgurl" value="'+forumPosts[index].image+
                      ' "required></label><label for="description">Detailed Description of your Post:'+
                      ' <textarea  name="description"  class="text"  style="height: 700px;" >'+
                         forumPosts[index].pdescription+'</textarea></label>'+
                      ' <input type="submit" style="margin-left:75%; margin-top:3%" value="Edit the Post">'+
                      ' </form>';
        				 

}

function editIt(index)
{
    var editPostFormObj = document.forms['editPostForm'];
    forumPosts[index].ptitle=editPostFormObj.elements.namedItem("title").value;
	forumPosts[index].topic=editPostFormObj.elements.namedItem("topic").value;
	forumPosts[index].psummary=editPostFormObj.elements.namedItem("summary").value;
    forumPosts[index].image=editPostFormObj.elements.namedItem("imgurl").value;
    forumPosts[index].pdescription=editPostFormObj.elements.namedItem("description").value;
    //Writing Data to the file
    postJSONData=JSON.stringify(forumPosts);
    writeFile('writePosts',postJSONData);
    loadJS();
}


function deletePosts()
{
    if(localStorage.getItem("loggedUser")==null || localStorage.getItem("loggedUser")=="null")
    {
 	  alert("Kindly Login to edit Posts in Colloquium");
      return false;
    }
 
    var n=forumPosts.length;
    var flag=false;


    document.getElementById('poster').innerHTML="";
    for(var i=0;i<n;i++)
    {
    	if(forumPosts[i].author===localStorage.getItem('loggedUser') || localStorage.getItem('loggedUser')==="admin")
    	{
    	  flag=true;	
    	  var d=new Date(forumPosts[i].date);	
          var post=' <!-- Post -->'+
						'<article class="box post post-excerpt">'+
						'	<header>'+
							'	<h2><a href="#" onclick="deleteIt('+i+')">'+forumPosts[i].ptitle+'</a></h2>'+
							'	<p>'+forumPosts[i].topic+'</p>'+
							'</header>'+
							'<div class="info">'+
								'<span class="date"><span class="month">'+monthNames[d.getMonth()]+'<span>y</span></span> <span class="day">'+d.getDate()+'</span><span class="year">, '+d.getFullYear()+'</span></span>'+
								'<ul class="stats">'+
									'<li><a href="#" class="icon fa-comment">'+forumPosts[i].comment.length+'</a></li>'+
									'<li><a href="#" class="icon fa-heart">'+forumPosts[i].avgrating+'</a></li>'+
								'</ul>'+
							'</div>'+
							'<a href="#" class="image featured" onclick="editSinglePost('+i+')" ><img src="'+forumPosts[i].image+'" alt=""></a>'+
							'<p class="reading">'+forumPosts[i].psummary+
							'</p>'+
						'</article>';

            
            document.getElementById('poster').innerHTML+="\n"+post;

    	}
    }
    if(flag===false)
    {
    	alert("You must author a post in order to delete it");
    	return false;
    }	

    loadJS();


}

function deleteIt(item)
{
	
	var d=prompt("Are you Sure?\nType yes to confirm");
	if(d==="yes"|| d==="Yes"|| d=== "YES")
		{forumPosts.splice(item, 1);
		 alert("The Post is successfully deleted !");
		 postJSONData=JSON.stringify(forumPosts);
		 writeFile('writePosts',postJSONData);
		}
	else
	{ alert("The Post is NOT deleted  Be Happy :) !");}
}

function avgRating(index)
{
	var totalValue=0;
	var rating=0;
	for(var c=0;c<forumPosts[index].comment.length;c++) 
	{    
     totalValue += parseInt(forumPosts[index].comment[c].rating);
    }
    if(forumPosts[index].comment.length!=0)
    {rating=totalValue/forumPosts[index].comment.length;}
    forumPosts[index].avgrating=rating;

    /*Saving changes to the file*/
    postJSONData=JSON.stringify(forumPosts);
    writeFile('writePosts',postJSONData);
    return rating;
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

