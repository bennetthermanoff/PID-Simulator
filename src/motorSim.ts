class MotorSim {
	angularMass: number;
	friction: number;
	angularVelocity: number;
	powerVariation: number;
	position: number;

	constructor(angularMass: number, friction: number, powerVariation: number) {
		this.angularMass = angularMass;
		this.friction = friction;
		this.powerVariation = powerVariation;
		this.angularVelocity = 0;
		this.position = 0;
	}
	getAngularVelocity() {
		return this.angularVelocity;
	}
	getPosition() {
		return this.position;
	}

	update(power: number, deltaTime: number) {

		this.position += (this.angularVelocity * deltaTime) % (2 * Math.PI);
		const randPower = power*10; //+ (Math.random() * this.powerVariation);
		const torque = randPower / this.angularMass;
		const angularAcceleration = torque - (this.friction * this.angularVelocity);
		this.angularVelocity += angularAcceleration * deltaTime;
	}

}
export default MotorSim;