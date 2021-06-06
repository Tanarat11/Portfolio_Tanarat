function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
        document.getElementById("username").innerHTML = "username";
        document.getElementById("Status").innerHTML = "Login-Register";
		window.location = "Register-login.html";
	}
}

checkCookie();
window.onload = pageLoad;

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

function pageLoad(){
    readJson();
    console.log("pageload");
    var username = getCookie('username');

	document.getElementById("username").innerHTML = username;
    document.getElementById("Status").innerHTML = "Logout";
    document.getElementById("Status").setAttribute("href","/logout")
	
}

async function readJson(){
	await fetch("/readCart",{
		method: "POST",
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
		},body: JSON.stringify({
            username:getCookie('username')})
		}).then((response) => {
            response.json().then((data) => {
                console.log(data)
                showData(data)
            })
        }).catch((err) => {
		console.log(err)
	})
}
function showData(data){
	console.log(Object.keys(data).length);
    var showdiv = document.getElementById("layer")
    var keys = Object.keys(data)
    for(var i = 0; i < keys.length; i++){
        var box = document.createElement("div");
        var idpic = i+"0"
        box.setAttribute("class","card cardinCart");
        box.setAttribute("id","Shoes"+i);
        var pic = document.createElement("img");
        pic.setAttribute("src",data[[keys[i]]].pic)
        pic.setAttribute("id",idpic)
        pic.setAttribute("class","card__img")
        pic.setAttribute("alt","")
        
        var card_data = document.createElement("div");
        card_data.setAttribute("class","card__data")

        var card_title = document.createElement("h1");
        card_title.innerHTML = data[[keys[i]]].name
        card_title.setAttribute("class","card__title")

        var card__preci = document.createElement("span");
        card__preci.innerHTML = "$"+data[[keys[i]]].price
        card__preci.setAttribute("class","card__preci")

        var card__button = document.createElement("a");
        var text =idpic+" Buy"
        card__button.setAttribute("id",text)
        card__button.innerHTML = "Remove"
        card__button.setAttribute("href","#")
        card__button.setAttribute("class","card__button")
        var add = document.createAttribute("Buyid");
        add.value = 0;
        card__button.setAttributeNode(add);
        card__button.setAttribute("onclick","RemoveTocart(id)")


        box.appendChild(pic)
        card_data.appendChild(card_title)
        card_data.appendChild(card__preci)
        card_data.appendChild(card__button)
        box.appendChild(card_data)
        showdiv.appendChild(box)
    }
}

function RemoveTocart(id){
    fetch("/readCart",{
		method: "POST",
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
		},body: JSON.stringify({
            username:getCookie('username')})
		}).then((response) => {
            response.json().then((data) => {
                console.log(data)
                var idfnm = parseInt(id)/10;
                var idbuy = document.getElementById(id);
                var jsondata = data;
                var keys = Object.keys(jsondata)
                for(var i=0;i<keys.length;i++)
                {
                    console.log(i+" "+keys.length);
                    if(i ==  idfnm)
                    {
                        delete jsondata["Shoes"+(i+1)]
                        for(var j=i;j<keys.length;j++)
                        {
                            if((j+1) == keys.length)
                            {
                                console.log(j+" Off lenght")
                                delete jsondata["Shoes"+(j+1)]
                                console.log(jsondata)
                            }
                            else
                            {
                                console.log(j)
                                jsondata["Shoes"+(j+1)] =jsondata["Shoes"+(j+2)]
                                console.log(jsondata["Shoes"+(j+1)])

                            }
                            
                        }
                        writeCart(jsondata);
                    }else 
                    {
                        //delete jsondata["Shoes"+(i+1)]
                    }
                }
            })
        }).catch((err) => {
		console.log(err)
	})
}

async function writeCart(data){
	await fetch("/OverWriteCart",{
		method: "POST",
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
		},body: JSON.stringify({
            username:getCookie('username'),
            datain: data})
		}).catch((err) => {
		console.log(err)
	})
    window.location = "Cart.html";
}

