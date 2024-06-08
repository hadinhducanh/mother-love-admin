import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Sun",
    milk: 4000,
    milk2: 2400,
    milk3: 2400,
  },
  {
    name: "Mon",
    milk: 3000,
    milk2: 1398,
    milk3: 2210,
  },
  {
    name: "Tue",
    milk: 2000,
    milk2: 9800,
    milk3: 2290,
  },
  {
    name: "Wed",
    milk: 2780,
    milk2: 3908,
    milk3: 2000,
  },
  {
    name: "Thu",
    milk: 1890,
    milk2: 4800,
    milk3: 2181,
  },
  {
    name: "Fri",
    milk: 2390,
    milk2: 3800,
    milk3: 2500,
  },
  {
    name: "Sat",
    milk: 3490,
    milk2: 4300,
    milk3: 2100,
  },
];

export const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Revenue Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="milk3"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="milk2"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="milk"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

