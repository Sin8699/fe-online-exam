import { useState, useEffect } from 'react'
import { merge } from 'lodash'
import ReactApexChart from 'react-apexcharts'
import { Box, Card, CardHeader } from '@material-ui/core'
import { BaseOptionChart } from '../../charts'
import useAxios from '../../../hooks/useAxios'
import { GET_ALL_CLIENT_TEST } from '../../../api/client-test'

// ----------------------------------------------------------------------

const getCategory = (raw) => {
  return raw.map((item) => String(item.testKitId))
}
const getPoint = (raw) => {
  return raw.map((item) => item.totalScore)
}

export default function AppConversionRates() {
  const [categories, setCategories] = useState([])

  const [points, setPoints] = useState([])

  const { response: dataAllTest } = useAxios(GET_ALL_CLIENT_TEST())

  useEffect(() => {
    if (dataAllTest) {
      setCategories(getCategory(dataAllTest?.data))
      setPoints(getPoint(dataAllTest?.data))
    }
  }, [dataAllTest])

  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { horizontal: true, barHeight: '28%', borderRadius: 2 } },
    xaxis: { categories: categories }
  })

  return (
    <Card>
      <CardHeader title="Most recent test" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: points }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  )
}
