function $(selector) {
	if (!selector) {
		throw new Error('Add proper selector');
	}
	return document.querySelectorAll(selector);
}

function width(el) {
	if (!el) {
		throw new Error('No element provided');
	}
	return 1
}

function height(el) {
	if (!el) {
		throw new Error('No element provided');
	}
	return parseFloat(getComputedStyle(el, null).height.replace('px', ''));
}
