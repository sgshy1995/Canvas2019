var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d') //获取绘画上下文2D

autoSetSize(canvas)

listenToUser(canvas)

var erasering = false

eraser.onclick = function () {
    erasering = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    erasering = false
    actions.className = 'actions'
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
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = 2
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