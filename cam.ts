import { printTitle, printable, toBinary, toDecimal } from './pretty.ts';
import { Binary, Digit, Mask, Natural } from './types.ts';

/* Content-addressable memory */
export class CAM {
  private readonly capacity = 8;
  private readonly values: Digit[][] = [];

  constructor(input: Natural<256>[]) {
    this.values.push(...input.map((decimal) => toBinary(decimal, this.capacity)));
  }

  findByMask(mask: Mask<typeof this.capacity>) {
    const flags: Digit[] = Array.from({ length: this.values.length }, () => 1);
    for (const [position, digit] of mask.split('').map(Number).entries()) {
      for (const [index, value] of this.values.entries()) {
        if (flags[index] === 1 && !isNaN(digit) && digit !== value[position]) {
          flags[index] = 0; // (¬Fi) & (Xi | Ai ~ Si)
        }
      }
    }
    return printable(this.values.filter((_, index) => flags[index] === 1), undefined, mask);
  }

  findNearest(input: Binary<typeof this.capacity>, options = { verbose: false }) {
    if (options.verbose) printTitle(input);
    const counters: number[] = Array.from({ length: this.values.length }, () => 0);
    for (const [position, digit] of input.split('').map(Number).entries()) {
      for (const [index, value] of this.values.entries()) {
        if (value[position] === digit) counters[index]++;
      }
    }
    const maxCounter = Math.max(...counters);
    let maxValueIndex = -1;
    for (const [index, counter] of counters.entries()) {
      if (counter === maxCounter) {
        if (options.verbose) printable(this.values[index], input).print();
        if (maxValueIndex === -1 || this.compare(index, maxValueIndex) === 1) {
          maxValueIndex = index;
        }
      }
    }
    if (options.verbose) console.log();
    return printable(this.values[maxValueIndex]);
  }

  compare(first: number, second: number, index = 0, nextG: Digit = 0, nextL: Digit = 0): 1 | 0 | -1 {
    if (index === this.capacity) return (nextL - nextG) as 1 | 0 | -1;
    const G = nextG || (!this.values[first][index] && this.values[second][index] && !nextL);
    const L = nextL || (this.values[first][index] && !this.values[second][index] && !nextG);
    return this.compare(first, second, index + 1, G as Digit, L as Digit);
  }

  print() {
    console.table(Object.fromEntries(this.values.map((value) => [toDecimal(value), value])));
  }
}
