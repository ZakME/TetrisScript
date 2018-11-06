// Object Interaction Library

function circleClicked(aCircle) {
	let d = dist(mouseX, mouseY, aCircle.x, aCircle.y);
	if (d < aCircle.r) {
		return true;
	} else {
		return false;
	}
}

function rectClicked(aRect) {
	return (mouseX > aRect.x && mouseX < aRect.x + aRect.w && mouseY > aRect.y && mouseY < aRect.y + aRect.h);
}

function circleIntersect(circ1, circ2) {
	return (dist(circ1.x, circ1.y, circ2.x, circ2.y) < circ1.r + circ2.r);
}

function rectIntersect1(rect1, rect2) {
	let le1 = rect1.x1;
	let re1 = rect1.x1 + 40;
	let te1 = rect1.y1;
	let be1 = rect1.y1 + 40;
	
	let le2 = rect2.x;
	let re2 = rect2.x + 40;
	let te2 = rect2.y;
	let be2 = rect2.y + 40;
	
	return (le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2);
}

function rectIntersect2(rect1, rect2) {
	let le1 = rect1.x2;
	let re1 = rect1.x2 + 40;
	let te1 = rect1.y2;
	let be1 = rect1.y2 + 40;
	
	let le2 = rect2.x;
	let re2 = rect2.x + 40;
	let te2 = rect2.y;
	let be2 = rect2.y + 40;
	
	return (le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2);
}
function rectIntersect3(rect1, rect2) {
	let le1 = rect1.x3;
	let re1 = rect1.x3 + 40;
	let te1 = rect1.y3;
	let be1 = rect1.y3 + 40;
	
	let le2 = rect2.x;
	let re2 = rect2.x + 40;
	let te2 = rect2.y;
	let be2 = rect2.y + 40;
	
	return (le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2);
}
function rectIntersect4(rect1, rect2) {
	let le1 = rect1.x4;
	let re1 = rect1.x4 + 40;
	let te1 = rect1.y4;
	let be1 = rect1.y4 + 40;
	
	let le2 = rect2.x;
	let re2 = rect2.x + 40;
	let te2 = rect2.y;
	let be2 = rect2.y + 40;
	
	return (le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2);
}