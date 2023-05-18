# associative-memory
#### Input
```ts
import { CAM } from './cam.ts';

const cam = new CAM([12, 8, 13, 15, 76, 23, 59, 44, 15, 20]);
cam.print();

console.log('Mask matches:');
cam.findByMask('x0xxx100').print();

console.log('Nearest:');
const nearest = cam.findNearest('00000110', { verbose: true });

console.log('Max nearest:');
nearest.print();
```
#### Output
![Screenshot from 2023-05-19 02-37-49](https://github.com/qaip/associative-memory/assets/105589311/67d57ff0-6714-4dc2-8c5e-8bd7c2c69bd0)
