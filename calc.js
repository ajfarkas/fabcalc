const mm2cm = mm => mm / 10;
const cm2mm = cm => cm * 10;

const in2mm = inches => inches * 25.4;
const in2cm = inches => mm2cm(in2mm(inches));
const mm2in = mm => mm / 25.4;
const cm2in = cm => mm2in(cm2mm(cm));

const isWholeNumber = num => {
	if (typeof num !== 'number') return false;
	return parseInt(num) === parseFloat(num);
};

const decToFraction = (dec, precision = 3) => {
	if (precision > 3) throw new Error('precision is too high. 3 places max.');

	const rounded = parseFloat(dec.toFixed(precision));
	const [whole, fract] = rounded.toString().split('.');
	if (!fract) return whole;

	const fractLen = fract.length;
	let denominator = Math.pow(10, Math.min(fractLen, precision));
	let numerator = fract;

	if (denominator % numerator === 0) {
		denominator = denominator / numerator;
		numerator = 1;
	} else {
		let tempNumer = numerator;
		let tempDenom = denominator;
		for (let divisor = 2; divisor < denominator; divisor++) {
			const numerDivided = numerator / divisor;
			const denomDivided = denominator / divisor;

			if (isWholeNumber(numerDivided) && isWholeNumber(denomDivided)) {
				tempNumer = numerDivided;
				tempDenom = denomDivided;
			}
		}
		numerator = tempNumer;
		denominator = tempDenom;
	}

	const fraction = numerator === denominator ? '' : `${numerator}/${denominator}`;
	return whole !== '0'
		? `${whole} ${fraction}`
		: fraction;
};

