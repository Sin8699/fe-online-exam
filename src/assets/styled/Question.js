import { styled } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

export const GridItemAnswer = styled(Grid)({ display: 'flex', alignItems: 'center' })

export const Score = styled('p')(({ theme }) => ({ ...theme.typography.body2, color: theme.palette.text.secondary, marginRight: 15 }))
