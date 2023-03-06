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

const reduceFraction = (numerator, denominator) => {
	let whole = false;
	// reduce to zero
	if (numerator === 0) return '0';
	// reduce to whole number
	if (numerator % denominator === 0) {
		return (numerator / denominator).toString();
	}
	// deal with mixed fractions
	if (numerator > denominator) {
		return decToFraction(numerator / denominator);
	}
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

	return numerator === denominator ? '' : `${numerator}/${denominator}`;
};

const decToFraction = (dec, precision = 3) => {
	if (precision > 3) throw new Error('precision is too high. 3 places max.');

	const rounded = parseFloat(dec.toFixed(precision));
	const [whole, fract] = rounded.toString().split('.');
	if (!fract) return whole;

	const fractLen = fract.length;
	let denominator = Math.pow(10, Math.min(fractLen, precision));
	let numerator = fract;

	const fraction = reduceFraction(numerator, denominator);
	return whole !== '0'
		? `${whole} ${fraction}`
		: fraction;
};

const roundToDenominator = (num, denominator, round = false) => {
	if (typeof denominator !== 'number') throw new Error('denominator arg must be of type number.');
	if (denominator === 0) throw new Error('cannot divide by 0');
	let numerator;

	const [numer, denom] = num.split('/').map(n => parseInt(n));
	const reductionFactor = denom / denominator;
	const reducedNumerator = numer / reductionFactor;
	if (round === 'down') {
		numerator = Math.floor(reducedNumerator);
	} else if (round === 'up') {
		numerator = Math.ceil(reducedNumerator);
	} else {
		numerator = Math.round(reducedNumerator);
	}

	return reduceFraction(numerator, denominator);
};

const decToRoundedFraction = (dec, precision, denominator, round) => {
	const mixed = decToFraction(dec, precision);
	const [whole, fraction] = mixed.split(' ');

	if (fraction) {
		const fractString = roundToDenominator(fraction, denominator, round);
		return fractString !== '0' ? `${whole} ${fractString}` : whole;
	}
	return roundToDenominator(whole, denominator, round);
};
