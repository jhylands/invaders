var xmlhttp;
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			var resp = xmlhttp.responseText;
			//take the responce and put it in the class box
			document.getElementById("class").innerHTML=resp;
		}
	}
	xmlhttp.open("GET","scripts/viewassignedstudentlogins.php?years=" + valYear + "&subjects=" + valClass ,true);
	xmlhttp.send();
