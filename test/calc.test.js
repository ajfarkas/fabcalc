runTests(() => {
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

		describe('Reduce fraction', () => {
			it('should reduce any multiple', () => {
				expect(reduceFraction(2, 4)).toEqual('1/2');
				expect(reduceFraction(8, 16)).toEqual('1/2');
				expect(reduceFraction(3, 6)).toEqual('1/2');
			});

			it('should reduce to 0', () => {
				expect(reduceFraction(0, 4)).toEqual('0');
			});

			it('should reduce to whole numbers', () => {
				expect(reduceFraction(3, 3)).toEqual('1');
				expect(reduceFraction(9, 3)).toEqual('3');
			});

			it('should handle mixed fractions', () => {
				expect(reduceFraction(3, 2)).toEqual('1 1/2');
				expect(reduceFraction(18, 16)).toEqual('1 1/8');
			});
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
			});
		});

		describe('Round to Denominator', () => {
			it('should round to the nearest fraction of the given denominator', () => {
				expect(roundToDenominator('3/50', 16)).toEqual('1/16');
				expect(roundToDenominator('19/50', 8)).toEqual('3/8');
				expect(roundToDenominator('119/50', 8)).toEqual('2 3/8');
				expect(roundToDenominator('99/100', 32)).toEqual('1');
				expect(roundToDenominator('1/100', 32)).toEqual('0');
			});

			it('should round and reduce', () => {
				expect(roundToDenominator('33/64', 16)).toEqual('1/2');
			});

			it('should not divide by zero', () => {
				try {
					expect(roundToDenominator('1/2', 0)).toEqual('0');
				} catch(err) {
					if (err.toString() !== 'Error: cannot divide by 0')
					throw new Error('Expected to receive an error.');
				}
			});

			it('should round down to nearest fraction of the given denominator', () => {
				expect(roundToDenominator('4/50', 16, 'down')).toEqual('1/16');
				expect(roundToDenominator('19/50', 8, 'down')).toEqual('3/8');
				expect(roundToDenominator('69/50', 8, 'down')).toEqual('1 3/8');
			});

			it('should round up to the nearest fraction of the given denominator', () => {
				expect(roundToDenominator('13/50', 8, 'up')).toEqual('3/8');
				expect(roundToDenominator('1/3', 1, 'up')).toEqual('1');
				expect(roundToDenominator('5/4', 2, 'up')).toEqual('1 1/2');
			});
		});

		describe('Convert decimal to rounded fraction', () => {
			it('should round the decimal to the nearest given denominator', () => {
				expect(decToRoundedFraction(2.1, 1, 8, false)).toEqual('2 1/8');
				expect(decToRoundedFraction(0.02, 2, 16, false)).toEqual('0');
			});

			it('should round the decimal up or down to the nearest given denominator', () => {
				expect(decToRoundedFraction(1.2, 1, 3, 'down')).toEqual('1');
				expect(decToRoundedFraction(1.01, 2, 3, 'up')).toEqual('1 1/3');
			});
		});
	});
});
