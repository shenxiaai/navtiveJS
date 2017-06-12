(function(doc, win) {
	var docEl = doc.documentElement, //html
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth <= 1600) {
				docEl.style.fontSize = 20 * (clientWidth / 750) + 'px';
			} else {
				docEl.style.fontSize = '16px';
			}

		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);