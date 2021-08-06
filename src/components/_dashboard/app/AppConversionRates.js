import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Box, Card, CardHeader } from "@material-ui/core";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [8, 6, 8.6, 9.8, 1, 2, 7, 5, 4, 8] }];

export default function AppConversionRates() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => seriesName,
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      categories: [
        "Test 1",
        "Test 2",
        "Test 3",
        "Test 4",
        "Test 5",
        "Test 6",
        "Test 7",
        "Test 8",
        "Test 9",
        "Test 10",
      ],
    },
  });

  return (
    <Card>
      <CardHeader title="Most recent test" />
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
