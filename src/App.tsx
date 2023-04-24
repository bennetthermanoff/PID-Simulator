import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { PID } from './pid';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FormControl, InputLabel, NativeSelect, Select, Slider } from '@mui/material';

const App = () => {
  const noisySine = (x: number, noise: number) => {
    return Math.sin(x) + (Math.random() * noise);
  }
  const randomNoise = (noise: number) => {
    return (Math.random() * noise);
  }


  const [graphData, setGraphData] = React.useState<[{ x: number, y: number, setpoint: number, error: number, output: number }]>([{ x: 0, y: 0, setpoint: 0, error: 0, output: 0 }]);
  const [selectedFunction, setSelectedFunction] = React.useState<number>(0);
  const [functionList, setFunctionList] = React.useState<{ name: string, func: (x: number, noise: number) => number }[]>([
    { name: "Noisy Sine", func: noisySine },
    { name: "Random Noise", func: randomNoise }
  ]);
  const [graphSettings, setGraphSettings] = React.useState<{ xMin: number, xMax: number, noise: number, N: number }>({ xMin: 0, xMax: 10, noise: 0.5, N: 100 });
  const [pid, setPid] = React.useState<PID>(new PID(0.1, 0.01, 0.01, 1));

  // React.useEffect(() => {
  //   const data: any[] = [];
  //   for (let i = graphSettings.xMin; i < graphSettings.xMax; i += (graphSettings.xMax - graphSettings.xMin) / graphSettings.N) {
  //     const pidOutput = pid.calculate()





  return (
    <div className="App">
      <ResponsiveContainer width="100%" height={400}>
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
        </LineChart>
      </ResponsiveContainer>

      <FormControl >
        <InputLabel id="function-select-label">Function Select</InputLabel>
        <NativeSelect
          id="function-select"
          value={functionList[selectedFunction].name}
          onChange={(e) => {
            setSelectedFunction(functionList.findIndex((f) => f.name === e.target.value));
          }}
        >
          {functionList.map((f, i) => <option key={i} value={f.name}>{f.name}</option>)}
        </NativeSelect>

        <Slider
          aria-label='x-axis-min-max'
          valueLabelDisplay='auto'

          value={[graphSettings.xMin, graphSettings.xMax]}
          onChange={(e, v) => {
            if (Array.isArray(v)) {
              if (v[0] < v[1]) {
                setGraphSettings({ ...graphSettings, xMin: v[0], xMax: v[1] });
              }
              else {
                setGraphSettings({ ...graphSettings, xMin: v[1], xMax: v[0] });
              }
            }
          }} />

        <Slider value={graphSettings.noise} onChange={(e, v) => {
          setGraphSettings({ ...graphSettings, noise: v as number });
        }} />




      </FormControl>



    </div>
  );
}






export default App;
