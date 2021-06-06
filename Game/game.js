window.onload = pageLoad;

function pageLoad(){
	var buttonstart = document.getElementById("start");
	buttonstart.onclick = startGame;
	

}

function startGame(){
	alert("Ready");
	addBox();
	timeStart();
}

function timeStart(){
	var TIMER_TICK = 1000;
	var timer = null;
	var min = 0.5; // 0.5 minute
	var second = min*60; 
	var x = document.getElementById('clock');
	//setting timer using setInterval function
	timer = setInterval(timeCount,TIMER_TICK);
	
	function timeCount(){
		var allbox = document.querySelectorAll("#game-layer div");
		// จัดการเกี่ยวกับเวลา เช่น ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลงเรื่อยๆ 
		second = second - 1;//ลดเวลา 1 วิ
		x.innerHTML =second; //โชว์เวลา
		console.log(allbox.length);
			// ถ้าไม่มีกล่องเหลือแล้ว และเวลายังเหลืออยู่จะขึ้นว่า You win!
			if(allbox.length == 0 && second>0 )
			{ 	// .length สำหรับบอกว่า กล่องมีอยู่กี่กล่อง
				//โชว์ว่า You win
				alert("You win");

				//clearInterval(ชื่อตัวแปรที่ทำ setInterval อยู่) เพื่อสั่งให้หยุดการทำงานของ setInterval
				clearInterval(timer);
				clearScreen();
			}
			// ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
			else if(allbox.length > 0 && second == 0 ){
			//โชว์ว่า You lose
			alert("You lose");

			//clearInterval(ชื่อตัวแปรที่ทำ setInterval อยู่) เพื่อสั่งให้หยุดการทำงานของ setInterval
			clearInterval(timer);

			//ทำเรียก function clear screen 
			clearScreen();
			}
		
	}
}

function addBox(){
	// สร้างกล่องตาม input ที่เราใส่ 
	var numbox = document.getElementById("numbox").value;//นับจำนวนกล่องที่กรอกลงไป
	var gameLayer = document.getElementById("game-layer") ;//กรอบที่รองรับวัตถุเพื่อใส่วัตถุไว้ด้านใน
	var colorDrop = document.getElementById("color").value;//ตัวรับสี
	for (var i =0; i<numbox;i++){
		var tempbox = document.createElement("div");//สร้างdivตามจำนวนคำสั่ง**
		//tempbox.innerText = "BOX "+i;
		tempbox.className = "square";//ดึง class square ใน css
		tempbox.id = "box"+i;
		tempbox.style.left = Math.random() * (500 - 25) + "px";
		tempbox.style.top = Math.random() * (500 - 25) + "px";
		tempbox.style.backgroundColor = colorDrop;//สีที่ผู้เล่นเลือก
		console.log("Create Box"+i +colorDrop);
		//add element to HTML node
		gameLayer.appendChild(tempbox);//วัตถุจะถูกส่งไปในกรอบตามคำสั่งนี้จนครบตามที่สั่ง**
		bindBox(tempbox);//สร้างกล่อง
	}
}

function bindBox(box){
	//เมื่อกดแล้ว กล่องจะหายไป
	box.onclick = function(){
		box.parentNode.removeChild(box);
	}
}

function clearScreen(){
	// ทำการลบ node ของกล่องทั้งหมด ออกจาก หน้าจอ
	var allbox = document.querySelectorAll("#game-layer div");

	//delete all  div
	for (var i=0;i<allbox.length;i++){
		allbox[i].parentNode.removeChild(allbox[i]);
	}
}




