import edit2Fill from '@iconify/icons-eva/edit-2-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

export const renderAction = ({ onEdit, onDelete }) => {
  const LIST_ACTIONS = [
    {
      key: 'edit',
      icon: edit2Fill,
      label: 'Edit',
      onClick: onEdit,
    },
    {
      key: 'delete',
      icon: trash2Outline,
      label: 'Delete',
      onClick: onDelete,
    },
  ];
  return LIST_ACTIONS;
};
