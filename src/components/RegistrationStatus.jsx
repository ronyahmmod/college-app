import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { db } from "../firebase.config";
import Title from "./Title";

// const count = (snapshot) => {
//   let countData = 0;
//   snapshot.forEach((doc) => {
//     countData = countData + 1;
//   });
//   return countData;
// };

// const renderCustomAxisTick = ({ x, y, payload }) => {
//   // console.log(payload);
//   return <Typography>{payload.value.substring(0, 6)}</Typography>;
// };

const formatTick = (value) => {
  return value.substring(0, 6).toUpperCase();
};
const RegistrationStatus = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    const loadData = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("role", "in", ["admin", "super"])
        );
        const querySnapshot = await getDocs(q);
        const admins = [];
        querySnapshot.forEach((doc) => {
          admins.push({ id: doc.id, ...doc.data() });
        });
        const coll = collection(db, "students");
        const dataPromise = admins.map(async (admin) => {
          const query_ = query(coll, where("submittedBy.id", "==", admin.id));
          const snapshot = await getDocs(query_);
          //   console.log(snapshot);
          //   const docs = count(snapshot);
          return {
            amount: snapshot.size,
            ...admin,
          };
        });

        Promise.all(dataPromise).then((data) => {
          // console.log(admins);
          // console.log(data);
          setData(data);
          setStatus("succeded");
        });
      } catch (error) {
        console.error(error);
        setData([]);
        setStatus("error");
      }
    };
    if (status === "idle") {
      loadData();
    }
  }, [status]);

  return (
    <Grid item sm={12}>
      <Button onClick={() => setStatus("idle")}>Reload</Button>
      <Title>Student entry status</Title>
      <Paper
        sx={{
          p: 2,
          my: 2,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignContent: "stretch",
          justifyContent: "space-arround",
        }}
      >
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="email"
                tickFormatter={formatTick}
                stroke="#8884d8"
              />
              <YAxis />
              <Tooltip wrapperStyle={{ backgroundColor: "#ccc" }} />
              <Legend
                width={100}
                wrapperStyle={{
                  top: 40,
                  right: 20,
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #d5d5d5",
                  borderRadius: 3,
                  lineHeight: "40px",
                }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="amount" barSize={30} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Paper>
    </Grid>
  );
};

export default RegistrationStatus;
