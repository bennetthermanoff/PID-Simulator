# PID Simulator

To run locally, you need to have [Node.js](https://nodejs.org/en/) installed.
There is also a [live version](https://hermanoff.dev/pid) available on my personal website.

## Running

To run the simulator, run the following commands in the root directory of the project:

```bash
npm install
npm start
```

or just use the live version at [hermanoff.dev/pid](https://hermanoff.dev/pid).

## Project Writeup
Learn more about the project motivations, methods, and some examples of use in the [project writeup](ProjectWriteup.pdf)

## Notable Files
If you are interested in how the simulator calculates outputs, please check out the following files:
- [src/pid.ts](src/pid.ts) - PID controller implementation
- [src/motorSim.ts](src/motorSim.ts) - Motor simulation
- [src/app.tsx](src/app.tsx#L17) - React app that renders the simulator and handles user input. Checkout the calculate hook for the main simulation loop.