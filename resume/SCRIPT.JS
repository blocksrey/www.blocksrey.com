canvas = document.createElement("canvas")
document.body.appendChild(canvas)
context = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

context.fillStyle = "white"
context.fillRect(0, 0, innerWidth, innerHeight)

context.fillStyle = "black"
context.font = "48px serif"
context.fillText("YoooO!!!", 10, 50)
