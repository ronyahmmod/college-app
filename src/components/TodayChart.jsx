import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";

// Generate Sales Data
const parsingData = (applications) => {
  const times = applications.map(
    (app) =>
      `${new Date(app.date).getHours()}:${new Date(app.date).getMinutes()}`
  );
  const countData = {};
  times.forEach((time) => {
    countData[time] = (countData[time] || 0) + 1;
  });
  return Object.keys(countData).map((key) => ({
    time: key,
    amount: countData[key],
  }));
};

// function createData(time, amount) {
//   return { time, amount };
// }

// const data = [
//   createData("00:00", 0),
//   createData("03:00", 300),
//   createData("06:00", 600),
//   createData("09:00", 800),
//   createData("12:00", 1500),
//   createData("15:00", 2000),
//   createData("18:00", 2400),
//   createData("21:00", 2400),
//   createData("24:00", 800),
// ];

const TodayChart = ({ applications }) => {
  console.log(applications);
  const theme = useTheme();
  let data = null;
  if (applications) {
    data = parsingData(applications);
    return (
      <>
        <Typography variant="h6" color="primary">
          Today
        </Typography>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: "middle",
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Applications
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }
};

export default TodayChart;
