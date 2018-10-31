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

function rectIntersect(rect1, rect2) {
	let le1 = rect1.x;
	let re1 = rect1.x + rect1.w;
	let te1 = rect1.y;
	let be1 = rect1.y + rect1.h;
	
	let le2 = rect2.x;
	let re2 = rect2.x + rect2.w;
	let te2 = rect2.y;
	let be2 = rect2.y + rect2.h;
	
	return (le1 < re2 && re1 > le2 && be1 > te2 && te1 < be2);
}