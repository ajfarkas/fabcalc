describe('Calculations', () => {
	it('should convert mm to cm', () => {
		expect(mm2cm(1000)).toEqual(100);
		expect(mm2cm(256)).toEqual(25.6);
	});

	it('should convert cm to mm', () => {
		expect(cm2mm(100)).toEqual(1000);
		expect(cm2mm(25.6)).toEqual(256);
	});

	it('should convert inches to mm', () => {
		expect(in2mm(1)).toEqual(25.4);
		expect(in2mm(256)).toEqual(6502.4);
		expect(in2mm(0.5)).toEqual(12.7);
	});

	it('should convert inches to cm', () => {
		expect(in2cm(1)).toEqual(2.54);
		expect(in2cm(256)).toEqual(650.24);
		expect(in2cm(0.5)).toEqual(1.27);
	});

	it('should convert mm to inches', () => {
		expect(mm2in(1)).toEqual(0.03937007874015748);
		expect(mm2in(256)).toEqual(10.078740157480315);
	});

	it('should convert cm to inches', () => {
		expect(cm2in(1)).toEqual(0.3937007874015748);
		expect(cm2in(256)).toEqual(100.78740157480316);
	});

	it('should check for whole numbers', () => {
		expect(isWholeNumber(25)).toEqual(true);
		expect(isWholeNumber(2.5)).toEqual(false);
		expect(isWholeNumber(1.0)).toEqual(true);
		expect(isWholeNumber(-1)).toEqual(true);
		expect(isWholeNumber('no!')).toEqual(false);
		expect(isWholeNumber(NaN)).toEqual(false);
	});

	describe('Convert decimal to fraction', () => {
		it('should work with whole numbers', () => {
			expect(decToFraction(25)).toEqual('25');
			expect(decToFraction(0)).toEqual('0');
			expect(decToFraction(25.0)).toEqual('25');
			expect(decToFraction(0.000)).toEqual('0');
		});

		it('should work with irreduceable fractions', () => {
			expect(decToFraction(0.123)).toEqual('123/1000');
			expect(decToFraction(12.123)).toEqual('12 123/1000');
		});

		it('should work with easily divisible fractions', () => {
			expect(decToFraction(0.5)).toEqual('1/2');
			expect(decToFraction(0.25)).toEqual('1/4');
			expect(decToFraction(25.125)).toEqual('25 1/8')
		});

		it('should work with more complex fractions', () => {
			expect(decToFraction(0.4)).toEqual('2/5');
			expect(decToFraction(0.375)).toEqual('3/8');
			expect(decToFraction(0.02)).toEqual('1/50');
			expect(decToFraction(0.419546436285097)).toEqual('21/50');
			expect(decToFraction(3.14159, 2)).toEqual('3 7/50');
			expect(decToFraction(1.1234567890, 0)).toEqual('1');
		});

		it('should not allow more than 3 places of decimal precision', () => {
			try {
				expect(decToFraction(0, 4)).toEqual('a');
			} catch(err) {
				if (err.toString() !== "Error: precision is too high. 3 places max.")
				throw new Error('Expected to receive an error.');
			}
		})
	})
});
