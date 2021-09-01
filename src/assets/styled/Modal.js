import { styled } from '@material-ui/styles'
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

export const ModalHeader = styled(DialogTitle)({ padding: 20, fontSize: 18, fontWeight: 600, borderBottom: '1px solid rgb(202, 207, 211)' })
export const ModalBody = styled(DialogContent)({ padding: '0 20px 20px 20px' })
export const ModalFooter = styled(DialogActions)({ borderTop: '1px solid rgb(202, 207, 211)', padding: '10px 20px' })
