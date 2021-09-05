import { styled } from '@material-ui/styles'
import { Grid, Paper } from '@material-ui/core'

export const GridItemAnswer = styled(Grid)({ display: 'flex', alignItems: 'center' })

export const Score = styled('p')(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginRight: 15
}))

export const ShowPoint = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: 'rgb(234, 238, 243)'
}))
