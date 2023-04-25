import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { PID } from './pid';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FormControl, InputLabel, Slider, Typography } from '@mui/material';
import MotorSim from './motorSim';

const App = () => {

	const [graphData, setGraphData] = React.useState<[{ x: number, y: number, v: number, setpoint: number, error: number, output: number }]>
	([{ x: 0, y: 0, v: 0, setpoint: 0, error: 0, output: 0 }]);

	const [graphSettings, setGraphSettings] = React.useState<{ xMin: number, xMax: number, noise: number, N: number, friction: number, mass:number }>({ xMin: 0, xMax: 1000, noise: 0, N: 1000, friction:10 , mass:50});
	const [pid, setPid] = React.useState<PID>(new PID(100, 0.0, 0.0, 2));

	const calculate = () => {
		const motor = new MotorSim(graphSettings.mass, graphSettings.friction, graphSettings.noise);
		pid.reset();
		const data = [];
		for (let i = 0; i < graphSettings.N; i++) {
			motor.update(pid.calculate(motor.position, 1 / graphSettings.N), 1 / graphSettings.N *200);
			const x = i / graphSettings.N * (graphSettings.xMax - graphSettings.xMin) + graphSettings.xMin;
			const y = motor.getPosition();
			const v = motor.getAngularVelocity();
			const output = pid.calculate(y, 1 / graphSettings.N *200);
			data.push({ x, y, v, setpoint: pid.setPoint, error: pid.setPoint - y, output });
		}
		setGraphData(data as typeof graphData);
	};

	return (
		<div className="App">
			<ResponsiveContainer width="100%" height={400} >
				<LineChart
					width={500}
					height={300}
					data={graphData}
					margin={{
						top: 5, right: 30, left: 20, bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="y" stroke="#82ca9d" />
					<Line type="monotone" dataKey="setpoint" stroke="#8884d8" />
					<Line type="monotone" dataKey="error" stroke="#ff0000" />
					{/* <Line type="monotone" dataKey="output" stroke="#0000ff" /> */}
					{/* <Line type="monotone" dataKey="v" stroke="#0000ff" /> */}
				</LineChart>

			</ResponsiveContainer>
			<ResponsiveContainer width="100%" height={400} >
				<LineChart

					width={500}
					height={300}
					data={graphData}
					margin={{
						top: 5, right: 30, left: 20, bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="output" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>

			<FormControl fullWidth style={{ width: 400 }}>
				<Typography>
          X Axis Limits
				</Typography>
				<Slider
					aria-label='x-axis-min-max'
					valueLabelDisplay='auto'
					min={0}
					max={5000}
					value={[graphSettings.xMin, graphSettings.xMax]}
					onChange={(e, v) => {
						console.log(v as [number, number]);

						const array = v as [number, number];
						if (array[0] >= array[1]) {
							[array[0], array[1]] = [array[1], array[0]];
						}
						setGraphSettings({ ...graphSettings, xMin: array[0] as number, xMax: array[1] as number , N: array[1] - array[0]});

					}} />

				<Typography>
          Noise
				</Typography>
				<Slider
					min={1}
					max={1000}
					value={graphSettings.noise} onChange={(e, v) => {
						setGraphSettings({ ...graphSettings, noise: v as number });
					}} />

				<Typography>
          Friction
				</Typography>
				<Slider
					min={0}
					max={10}
					value={graphSettings.friction} onChange={(e, v) => {
						setGraphSettings({ ...graphSettings, friction: v as number });
					}} />
				<Typography>
          Motor Mass
				</Typography>
				<Slider
					min={0}
					max={100}
					value={graphSettings.mass} onChange={(e, v) => {
						setGraphSettings({ ...graphSettings, mass: v as number });
					}} />

				<Typography>
          P Constant
				</Typography>
				<Slider min={0.0}
					max={5.0}
					valueLabelDisplay='auto'
					step={0.01}
					value={
						pid.Pconstant
					} onChange={(e, v) => {
						setPid(new PID(v as number, pid.Iconstant, pid.Dconstant, pid.setPoint));
					}} />

				<Typography>
          I Constant
				</Typography>
				<Slider min={-10.0}
					max={10.0}
					valueLabelDisplay='auto'
					step={0.01}
					value={
						pid.Iconstant
					} onChange={(e, v) => {
						setPid(new PID(pid.Pconstant, v as number, pid.Dconstant, pid.setPoint));
					}} />

				<Typography>
          D Constant
				</Typography>
				<Slider min={-1.0}
					max={1.0}
					step={0.01}
					valueLabelDisplay='auto'
					value={
						pid.Dconstant
					} onChange={(e, v) => {
						setPid(new PID(pid.Pconstant, pid.Iconstant, v as number, pid.setPoint));
					}} />

				<Typography>
          Setpoint
				</Typography>
				<Slider min={0.0}
					max={2 * Math.PI}
					valueLabelDisplay='auto'
					value={
						pid.setPoint
					} onChange={(e, v) => {
						setPid(new PID(pid.Pconstant, pid.Iconstant, pid.Dconstant, v as number));
					}} />

				<button onClick={calculate}>Calculate</button>

			</FormControl>
		</div>
	);
};

export default App;
