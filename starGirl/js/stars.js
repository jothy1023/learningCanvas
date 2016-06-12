var starObj = function() {
	// 在canvas上的位置
	this.x;
	this.y;

	// starPic中星星的位置，即显示哪颗星星
	this.starNo;
	// 两帧之间的时间间隔，用于控制上一帧结束到下一帧开始期间，应该切换到哪一帧星星
	this.timer;

	// 用于星星的移动，添加到x，y属性上
	this.xSpeed;
	this.ySpeed;

}

// 初始化星星的属性
starObj.prototype.init = function() {
	// Math.random() returns [0, 1)
	this.x = Math.random() * girlWidth + padLeft;
	this.y = Math.random() * girlHeight + padTop;

	this.starNo = Math.floor(Math.random() * 7);
	this.timer = 0;

	this.xSpeed = Math.random() * 0.5 - 0.25;
	this.ySpeed = Math.random() * 0.5 - 0.25;
}

// 每一次绘制时，刷新属性
starObj.prototype.update = function() {
	this.x += this.xSpeed;
	this.y += this.ySpeed;

	// 如果星星超出区域，则重新生成
	if (this.x >= (girlWidth + padLeft) || this.x <= padLeft || this.y >= (girlHeight + padTop) || this.y <= padTop ) {
		this.init();
	}

	this.timer += deltaTime;
	if (this.timer > 30) {
		// 当时间间隔超过30ms，就刷新帧数
		this.starNo += 1;
		this.starNo %= 7;
		this.timer = 0;
	}
}

starObj.prototype.draw = function() {
	// save and restore method 配对使用，形成作用域，写在作用域内的方法只在这里有效
	ctx.save();

	// 在绘制星星之前设置其透明度，仅作用于此区域
	ctx.globalAlpha = life;

	// context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
	// @param sx, sy --- img's begin position
	// @param swidth, sheight --- the size to cut img
	// @param x, y --- img's position on canvas
	// @param width, height ---  img's display size
	ctx.drawImage(starPic, this.starNo * 7, 0, starWidth, starHeight, this.x, this.y, starWidth, starHeight);

	ctx.restore();
}

function drawStars() {
	for (var i = 0; i < starNum; i++) {
		stars[i].update();
		stars[i].draw();
	}
}

function aliveUpdate() {
	if (switchy) {
		// show stars
		// life控制星星的透明度，由浅入深
		life += 0.03 * deltaTime * 0.05;
		if (life > 1) {
			life = 1;
		}  
	} else {
		// hide stars
		life -= 0.04 * deltaTime * 0.05;
		if (life < 0) {
			life = 0;
		}  
	}
}