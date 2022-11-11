import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Box, Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../../utils/formatNumber";
//
import { BaseOptionChart } from "../../../components/charts";

// ----------------------------------------------------------------------

export default function AppConversionRates({ userCity }) {
  const ChartData = [];
  const Categories = [];

  userCity.map((item) => {
    ChartData.push(item.users_count);
    Categories.push(item.city);
  });

  const CHART_DATA = [{ data: ChartData }];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      categories: Categories,
    },
  });

  return (
    <Card>
      <CardHeader title="عدد الطلاب المؤكدين في المحافظات" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
