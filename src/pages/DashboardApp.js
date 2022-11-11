// material
import {
  Box,
  Grid,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  AppBugReports2,
  AppItemOrders2,
  AppAllPoints,
  AppMonthlyPoints,
} from "../sections/@dashboard/app";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { chartsURL } from "../constants/urls";
import CoursesByDay from "../sections/@dashboard/app/CoursesByDay";
import CourseByWeek from "../sections/@dashboard/app/CourseByWeek";
import CourseByMonth from "../sections/@dashboard/app/CourseByMonth";
import PieChart1 from "../sections/@dashboard/app/PieChart1";
import PieChart2 from "../sections/@dashboard/app/PieChart2";
import PieChart3 from "../sections/@dashboard/app/PieChart3";
import PieChart4 from "../sections/@dashboard/app/PieChart4";
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { t } = useTranslation();
  const token = localStorage.getItem("NToken");
  let navigate = useNavigate();
  const [charts, setCharts] = useState();

  function fecthData() {
    if (token === null) {
      navigate("/");
    } else {
      axios
        .get(`${chartsURL}`, {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCharts(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (token === null) {
      navigate("/");
    } else {
      fecthData();
    }
  }, [token]);

  if (charts === undefined) {
    return <LinearProgress />;
  }
  return (
    <Page title="نجاحي | لوحة التحكم">
      <Container maxWidth="xl">
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4">
            {t("description.dashboardAppWelcome")}{" "}
            {localStorage.getItem("Nusername")}
          </Typography>
        </Box>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">الطلاب</Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales allStudent={charts.allStudent} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers verifiedUsers={charts.verifiedUsers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders UnVerifiedUsers={charts.UnVerifiedUsers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports DailyNewUsers={charts.DailyNewUsers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports2 WeeklyNewUsers={charts.WeeklyNewUsers} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders2 MonthlyNewUsers={charts.MonthlyNewUsers} />
          </Grid>
        </Grid>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">النقاط</Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          <Grid item xs={12} sm={6} md={3}>
            <AppAllPoints paymentPoints={charts.paymentPoints} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppMonthlyPoints
              MonthlyPaymentPoints={charts.MonthlyPaymentPoints}
            />
          </Grid>
        </Grid>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">عدد المواد المشتراة هذا اليوم</Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          {charts.DailyStudentCourses.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CoursesByDay
                name={item.Course}
                number={item.StudentNumberInCourse}
              />
            </Grid>
          ))}
        </Grid>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">عدد المواد المشتراة هذا الأسبوع</Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          {charts.WeeklyStudentCourses.length === 0
            ? "لا يوجد"
            : charts.WeeklyStudentCourses.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <CourseByWeek
                    name={item.Course}
                    number={item.StudentNumberInCourse}
                  />
                </Grid>
              ))}
        </Grid>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">عدد المواد المشتراة هذا الشهر</Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          {charts.MonthlyStudentCourses.length === 0
            ? "لا يوجد"
            : charts.MonthlyStudentCourses.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <CourseByMonth
                    name={item.Course}
                    number={item.StudentNumberInCourse}
                  />
                </Grid>
              ))}
        </Grid>
        <hr />
        <Grid container spacing={3} sx={{ margin: "2rem 0" }}>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits studentCourses={charts.studentCourses} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates userCity={charts.userCity} />
          </Grid>
        </Grid>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">احصائيات المواد ( فيديوهات )</Typography>
        </Box>
        <Grid container spacing={3} sx={{ margin: "2rem 0" }}>
          {charts.course_students.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <PieChart1 coursesUnites={item} />
            </Grid>
          ))}
        </Grid>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">
            احصائيات المواد ( ملفات - مجلدات)
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ margin: "2rem 0" }}>
          {charts.course_students.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <PieChart3 coursesUnites={item} />
            </Grid>
          ))}
        </Grid>

        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">احصائيات المواد ( ملفات - وحدات)</Typography>
        </Box>
        <Grid container spacing={3} sx={{ margin: "2rem 0" }}>
          {charts.course_students.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <PieChart4 coursesUnites={item} />
            </Grid>
          ))}
        </Grid>
        <hr />
        <Box sx={{ py: 3 }}>
          <Typography variant="h4">احصائيات الدورات</Typography>
        </Box>
        <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
          {charts.course_students.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <PieChart2 coursesUnites={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
