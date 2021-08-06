import infoFill from '@iconify/icons-eva/info-fill';

export const renderAction = ({ onDetail }) => {
  const LIST_ACTIONS = [
    {
      key: 'detail',
      icon: infoFill,
      label: 'Detail',
      onClick: onDetail,
    },
  ];
  return LIST_ACTIONS;
};
