import React from 'react';
import { MenuItem, ListItemIcon } from '@material-ui/core';
import { Icon } from '@iconify/react';

const MenuAction = ({ listActions }) => {
  return listActions.map((action) => {
    return (
      <MenuItem
        sx={{ color: 'text.secondary' }}
        key={action.key}
        onClick={() => {
          action.onClick();
        }}
      >
        <ListItemIcon style={{ minWidth: 34 }}>
          <Icon icon={action.icon} width={24} height={24} />
        </ListItemIcon>
        {action.label}
      </MenuItem>
    );
  });
};

export default MenuAction;
