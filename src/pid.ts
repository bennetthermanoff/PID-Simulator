class PID {
    Pconstant: number;
    Iconstant: number;
    Dconstant: number;
    previousError: number;
    integral: number;
    setPoint: number;
    constructor(Pconstant: number, Iconstant: number, Dconstant: number, setPoint: number) {
        this.Pconstant = Pconstant;
        this.Iconstant = Iconstant;
        this.Dconstant = Dconstant;
        this.previousError = 0;
        this.integral = 0;
        this.setPoint = setPoint;
        
    }
    calculate(input: number, dt: number) {
        let error = this.setPoint - input;
        this.integral += error * dt;
        let derivative = (error - this.previousError) / dt;
        this.previousError = error;
        return this.Pconstant * error + this.Iconstant * this.integral + this.Dconstant * derivative;
        
    }
}
export { PID };