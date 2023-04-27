class MotorSim {
	angularMass: number;
	friction: number;
	angularVelocity: number;
	powerVariation: number;
	position: number;
	inputDelay: number;
	cachedInputs: number[];

	constructor(angularMass: number, friction: number, powerVariation: number, inputDelay: number) {
		this.angularMass = angularMass;
		this.friction = friction;
		this.powerVariation = powerVariation;
		this.angularVelocity = 0;
		this.position = 0;
		this.inputDelay = inputDelay;
		this.cachedInputs = new Array(inputDelay).fill(0);
	}
	getAngularVelocity() {
		return this.angularVelocity;
	}
	getPosition() {
		return this.position;
	}

	update(power: number, deltaTime: number) {
		const input=this.cachedInputs.shift()?power:0;
		this.cachedInputs.push(power);
		this.position += (this.angularVelocity * deltaTime) % (2 * Math.PI);
		const randPower = input*10 + input*Math.random() * this.powerVariation;
		const torque = randPower / this.angularMass;
		const angularAcceleration = torque - (this.friction * this.angularVelocity);
		this.angularVelocity += angularAcceleration * deltaTime;
	}

}
export default MotorSim;