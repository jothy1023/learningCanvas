var canvas,
    ctx,
    cw,
    ch,
    girlPic = new Image(),
    starPic = new Image();

var girlWidth = 600,
	girlHeight = 300;

var padTop = 150,
	padLeft = 100;

var stars = [],
	starNum = 67;

var starWidth = 7,
	starHeight = 7;

var lastTime,
	// 两帧之间的时间间隔
	deltaTime;

var switchy = false;

// 初始生命值，控制globalAlpha透明度范围，即星星是否显示
var life = 0;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // canvas's width and height
    cw = canvas.width;
    ch = canvas.height;

    // add mouse event. The third parameter means 事件句柄在冒泡阶段执行, 而不是在捕获阶段执行
    document.addEventListener('mousemove', mousemove, false);

    // girl's and star's image
    girlPic.src = 'src/girl.jpg';
    starPic.src = 'src/star.png';

    // add stars
    for (var i = 0; i < starNum; i++) {
    	var star = new starObj();
    	star.init();
    	stars.push(star);
    }

    // get time
    lastTime = Date.now();

    gameLoop();
}

function gameLoop() {
    window.requestAnimFrame(gameLoop);

    // 获取时间与时间间隔
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    // 注释掉会不会有影响？会。星星可能会超出范围
    fillCanvas();
    drawGirl();	

    // 绘制星星
    drawStars();

    // 判断是否显示
    aliveUpdate();

}

document.body.onload = init;


// 填充背景色
function fillCanvas() {
    ctx.fillStyle = '#cde3ec';
    ctx.fillRect(0, 0, cw, ch);
}

// 绘制女孩图片
function drawGirl() {
	ctx.drawImage(girlPic, padLeft, padTop, girlWidth, girlHeight);
}

function mousemove(e) {
	// 如果鼠标移动
	if (e.offsetX || e.layerX) {
		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;

		// 如果鼠标在范围内，则为true
		if (px <= (girlWidth + padLeft) && px >= padLeft && py <= (girlHeight + padTop) && py >= padTop) {
            switchy = true;
        } else {
            switchy = false;
        }
	}
}

// requestAnimFrame兼容
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();
