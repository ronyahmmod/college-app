import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import React, { useEffect, useState } from "react";
import Credit from "../components/Credit";
import Layout from "../components/Layout";
import RecentApplications from "../components/RecentApplications";
import TodayChart from "../components/TodayChart";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../feature/user/userSlice";
import {
  fetchApplications,
  selectApplicationStatus,
  selectTodaysApplications,
  selectTodaysApplicationsByUserId,
  setStatus,
} from "../feature/application/applicationSlice";
import CustomButton from "../components/CustomButton";
import NewIcon from "@mui/icons-material/Newspaper";

const Overview = () => {
  const status = useSelector(selectApplicationStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchApplications());
    }
  }, [status, dispatch]);
  const [open, setOpen] = useState(false);

  const loggedInUser = useSelector(selectLoggedInUser);
  const todaysApplications = useSelector(selectTodaysApplications);
  const todaysApplicationById = useSelector(
    selectTodaysApplicationsByUserId(loggedInUser && loggedInUser.id)
  );

  if (loggedInUser && todaysApplications) {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ReplayIcon />}
              onClick={() => dispatch(setStatus("idle"))}
              disabled={status === "loading"}
            ></Button>
            <Grid container spacing={3}>
              {/* Today Graph */}
              {loggedInUser && loggedInUser.role !== "user" && (
                <>
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 240,
                      }}
                    >
                      <TodayChart applications={todaysApplications} />
                    </Paper>
                  </Grid>
                  {/* Today Statics */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 240,
                      }}
                    >
                      {/* Deposit */}
                      <Credit applications={todaysApplications} />
                    </Paper>
                  </Grid>
                </>
              )}

              {/* TODO: Services */}
              {loggedInUser.role === "user" && (
                <Grid item sm={12}>
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
                    <CustomButton
                      color="#ddd"
                      backgroundColor="#449"
                      Icon={NewIcon}
                      title="সার্টিফিকেট গ্রহণের জন্য আমাকে ক্লিক করুন!"
                      description="এই আবেদনের মাধ্যমে অত্র কলেজ হতে বোর্ড অথবা বিশ্ববিদ্যালয়ের পরীক্ষায় উত্তীর্ণ সার্টিফিকেট গ্রহণ করা যাবে। এর জন্য 
                      আপনাকে সংশ্লিষ্ট পরীক্ষার প্রবেশপত্র স্ক্যান করে আবেদনের সাথে সংযুক্ত করতে হবে। সকল তথ্য ইংরেজিতে সাবধানে পূরণ করতে হবে। আবেদন সাবমিট করার
                      পর কলেজে উপস্থিত হয়ে ২০০ টাকা জমা দিতে হবে এবং সার্টিফিকেট গ্রহণে করতে হবে।"
                      path="newapplication"
                    />
                    <CustomButton
                      color="#ddd"
                      backgroundColor="#449"
                      Icon={NewIcon}
                      title="প্রশংসাপত্র গ্রহণের জন্য আমাকে ক্লিক করুন!"
                      description="এই আবেদনের মাধ্যমে অত্র কলেজ হতে বোর্ড অথবা বিশ্ববিদ্যালয়ের পরীক্ষায় উত্তীর্ণ মার্কশিট, কলেজ হতে প্রদত্ত প্রশংসাপত্র এবং ভর্তি মার্কশিট গ্রহণ করা যাবে। এর জন্য 
                      আপনাকে সংশ্লিষ্ট পরীক্ষার প্রবেশপত্র স্ক্যান করে আবেদনের সাথে সংযুক্ত করতে হবে। সকল তথ্য ইংরেজিতে সাবধানে পূরণ করতে হবে। আবেদন সাবমিট করার
                      পর কলেজে উপস্থিত হয়ে ২০০ টাকা জমা দিতে হবে এবং ড্যকুমেন্টস গ্রহণে করতে হবে।"
                      path="newapplication"
                    />
                    <CustomButton
                      color="#ddd"
                      backgroundColor="#449"
                      Icon={NewIcon}
                      title="বর্তমানে অত্র কলেজে অধ্যয়নরত শিক্ষার্থীরা প্রত্যয়নপত্র নিতে আমাকে ক্লিক করুন!"
                      description="এই আবেদনের মাধ্যমে বর্তমানে অধ্যয়নরত শিক্ষার্থীরা তাদের বিভিন্ন কাজে ব্যবহৃত প্রত্যয়পত্র গ্রহণ করতে পারবেন। এর জন্য 
                      আপনাকে পূর্ববর্তী/বিগত পরীক্ষার প্রবেশপত্র স্ক্যান করে আবেদনের সাথে সংযুক্ত করতে হবে। সকল তথ্য ইংরেজিতে সাবধানে পূরণ করতে হবে। আবেদন সাবমিট করার
                      পর কলেজে উপস্থিত হয়ে ১০০ টাকা জমা দিতে হবে এবং ড্যকুমেন্টস গ্রহণে করতে হবে। "
                      path="prottoionforcurrent"
                    />
                    <CustomButton
                      color="#ddd"
                      backgroundColor="#449"
                      Icon={NewIcon}
                      title="অত্র কলেজ হতে উত্তীর্ণ শিক্ষার্থীরা প্রত্যয়নপত্র নিতে আমাকে ক্লিক করুন!"
                      description="এই আবেদনের মাধ্যমে বোর্ড পরীক্ষায় উত্তীর্ণ শিক্ষার্থীরা তাদের বিভিন্ন কাজে ব্যবহৃত প্রত্যয়পত্র গ্রহণ করতে পারবেন। এর জন্য 
                      আপনাকে সংশ্লিষ্ট পরীক্ষার প্রবেশপত্র স্ক্যান করে আবেদনের সাথে সংযুক্ত করতে হবে। সকল তথ্য ইংরেজিতে সাবধানে পূরণ করতে হবে। আবেদন সাবমিট করার
                      পর কলেজে উপস্থিত হয়ে ১০০ টাকা জমা দিতে হবে এবং ড্যকুমেন্টস গ্রহণে করতে হবে। "
                      path="prottoionforpassed"
                    />
                    <CustomButton
                      color="#ddd"
                      backgroundColor="#449"
                      Icon={NewIcon}
                      title="বিভিন্ন ড্যকুমেন্ট সংশোধনের জন্য প্রত্যয়নপত্র নিতে আমাকে ক্লিক করুন!"
                      description="এই আবেদনের মাধ্যমে বর্তমানে অধ্যয়নরত শিক্ষার্থীরা তাদের বিভিন্ন ড্যকুমেন্ট যেমনঃ সার্টিফিকেট, মার্কশিট, প্রবেশপত্র, রেজিস্ট্রেশন কার্ডের ভূল সংশোধনের কাজে ব্যবহৃত প্রত্যয়পত্র গ্রহণ করতে পারবেন। এর জন্য 
                      আপনাকে সংশ্লিষ্ট পরীক্ষার প্রবেশপত্র স্ক্যান করে আবেদনের সাথে সংযুক্ত করতে হবে। সকল তথ্য ইংরেজিতে সাবধানে পূরণ করতে হবে। আবেদন সাবমিট করার
                      পর কলেজে উপস্থিত হয়ে ১০০ টাকা জমা দিতে হবে এবং ড্যকুমেন্টস গ্রহণে করতে হবে। "
                      path="prottoionforcorrection"
                    />
                  </Paper>
                </Grid>
              )}

              {/* Current Applications */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    overflowX: "auto",
                  }}
                >
                  {/* Recent applications */}
                  <RecentApplications
                    applications={
                      loggedInUser.role === "user"
                        ? todaysApplicationById
                        : todaysApplications
                    }
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    );
  }
  if (status === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
};

export default Overview;
