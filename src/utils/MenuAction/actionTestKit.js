import edit2Fill from '@iconify/icons-eva/edit-2-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import fileTextOutline from '@iconify/icons-eva/file-text-outline'

export const renderAction = ({ onEdit, onEditQuestion, onDelete }) => {
  const LIST_ACTIONS = [
    {
      key: 'edit',
      icon: edit2Fill,
      label: 'Edit',
      onClick: onEdit,
    },
    {
      key: 'question',
      icon: fileTextOutline,
      label: 'Question',
      onClick: onEditQuestion,
    },
    {
      key: 'delete',
      icon: trash2Outline,
      label: 'Delete',
      onClick: onDelete,
    },
  ]
  return LIST_ACTIONS
}
