import edit2Fill from '@iconify/icons-eva/edit-2-fill'
import linkFill from '@iconify/icons-eva/link-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import fileTextOutline from '@iconify/icons-eva/file-text-outline'

export const renderAction = ({ onEdit, onEditQuestion, onGetLink, onDelete }) => {
  const LIST_ACTIONS = [
    {
      key: 'edit',
      icon: edit2Fill,
      label: 'Edit',
      onClick: onEdit
    },
    {
      key: 'question',
      icon: fileTextOutline,
      label: 'Question',
      onClick: onEditQuestion
    },
    {
      key: 'get-link',
      icon: linkFill,
      label: 'Get Link',
      onClick: onGetLink
    },
    {
      key: 'delete',
      icon: trash2Outline,
      label: 'Delete',
      onClick: onDelete
    }
  ]
  return LIST_ACTIONS
}
