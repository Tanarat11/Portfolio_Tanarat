var text = document.getElementById("text1")
var topic1 = document.getElementById("topic1")
var comment1 = document.getElementById("comment1")
var comment2 = document.getElementById("comment2")

topic1 = 0
comment1 = 0
comment2 = 0
console.log("topic1 ", topic1)
console.log("comment1 ", comment1)
console.log("comment2 ", comment2)

function postFunction() {
    var fuu = document.getElementById("text1").value
    if (topic1 == 0) {
        document.getElementById("topic1").innerText = fuu
        topic1 = 1
    }
    else if (comment1 == 0) {
        document.getElementById("comment1").innerText = fuu
        comment1 = 1
    }
    else {
        document.getElementById("comment2").innerText = fuu
        comment2 = 1
    }
}

function clearFunction() 
{
    topic1 = 0
    comment1 = 0
    comment2 = 0
    document.getElementById("topic1").innerText = ""
    document.getElementById("comment1").innerText = ""
    document.getElementById("comment2").innerText = ""
}