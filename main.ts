import { CAM } from './cam.ts';

const cam = new CAM([12, 8, 13, 15, 76, 23, 59, 44, 15, 20]);
cam.print();

console.log('Mask matches:');
cam.findByMask('x0xxx100').print();

console.log('Nearest:');
const nearest = cam.findNearest('00000110', { verbose: true });

console.log('Max nearest:');
nearest.print();
