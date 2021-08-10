import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Box, Card, CardHeader } from "@material-ui/core";
//
import { BaseOptionChart } from "../../charts";

// ----------------------------------------------------------------------

export default function AppConversionRates({ data }) {
  const { categories = [], points = [] } = data;
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
      categories,
    },
  });

  return (
    <Card>
      <CardHeader title="Most recent test" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: points }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
