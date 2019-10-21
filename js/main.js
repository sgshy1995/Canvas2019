var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d') //获取绘画上下文2D
var lineWidth = 1

autoSetSize(canvas)

listenToUser(canvas)

var erasering = false

pen.onclick = function () {
    erasering = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    erasering = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function () {
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.download = '我的绘画'
    a.click()
}

black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    wheat.classList.remove('active')
    green.classList.remove('active')
    purple.classList.remove('active')
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    wheat.classList.remove('active')
    green.classList.remove('active')
    purple.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
    wheat.classList.remove('active')
    green.classList.remove('active')
    purple.classList.remove('active')
}
wheat.onclick = function () {
    context.fillStyle = 'wheat'
    context.strokeStyle = 'wheat'
    wheat.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
    green.classList.remove('active')
    purple.classList.remove('active')
}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    wheat.classList.remove('active')
    black.classList.remove('active')
    purple.classList.remove('active')
}
purple.onclick = function () {
    context.fillStyle = 'purple'
    context.strokeStyle = 'purple'
    purple.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    wheat.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}

sizeOne.onclick = function () {
    lineWidth = 1
    sizeOne.classList.add('active')
    sizeTwo.classList.remove('active')
    sizeThree.classList.remove('active')
    sizeFour.classList.remove('active')
    sizeFive.classList.remove('active')
    sizeSix.classList.remove('active')
}
sizeTwo.onclick = function () {
    lineWidth = 2
    sizeTwo.classList.add('active')
    sizeOne.classList.remove('active')
    sizeThree.classList.remove('active')
    sizeFour.classList.remove('active')
    sizeFive.classList.remove('active')
    sizeSix.classList.remove('active')
}
sizeThree.onclick = function () {
    lineWidth = 3
    sizeThree.classList.add('active')
    sizeTwo.classList.remove('active')
    sizeOne.classList.remove('active')
    sizeFour.classList.remove('active')
    sizeFive.classList.remove('active')
    sizeSix.classList.remove('active')
}
sizeFour.onclick = function () {
    lineWidth = 4
    sizeFour.classList.add('active')
    sizeTwo.classList.remove('active')
    sizeThree.classList.remove('active')
    sizeOne.classList.remove('active')
    sizeFive.classList.remove('active')
    sizeSix.classList.remove('active')
}
sizeFive.onclick = function () {
    lineWidth = 5
    sizeFive.classList.add('active')
    sizeTwo.classList.remove('active')
    sizeThree.classList.remove('active')
    sizeFour.classList.remove('active')
    sizeOne.classList.remove('active')
    sizeSix.classList.remove('active')
}
sizeSix.onclick = function () {
    lineWidth = 6
    sizeSix.classList.add('active')
    sizeTwo.classList.remove('active')
    sizeThree.classList.remove('active')
    sizeFour.classList.remove('active')
    sizeFive.classList.remove('active')
    sizeOne.classList.remove('active')
}


function autoSetSize(canvas) {
    widthAndHeight()
    window.onresize = function () {
        widthAndHeight()
    }
    function widthAndHeight() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {   //draw a circle function
    context.beginPath()
    context.arc(x, y, 0.1, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (sgs) {
            var x = sgs.touches[0].clientX
            var y = sgs.touches[0].clientY
            using = true
            if (erasering) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x: x, y: y }
                drawCircle(x, y, 1)
            }
        }
        canvas.ontouchmove = function (sgs) {
            var x = sgs.touches[0].clientX
            var y = sgs.touches[0].clientY
            if (!using) { return }

            if (erasering) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { x: x, y: y }
                drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (sgs) {
            var x = sgs.clientX
            var y = sgs.clientY
            using = true
            if (erasering) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x: x, y: y }
                drawCircle(x, y, 1)
            }
        }

        canvas.onmousemove = function (sgs) {
            var x = sgs.clientX
            var y = sgs.clientY
            if (!using) { return }

            if (erasering) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { x: x, y: y }
                drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.onmouseup = function () {
            using = false
        }

    }
}