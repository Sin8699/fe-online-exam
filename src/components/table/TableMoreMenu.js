import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
} from "@material-ui/core";
import { TYPE_MODAL } from "../../constants/modal";
import EditUserModal from "../../components/Modal/EditUserModal";
import useAxios from "../../hooks/useAxios";
import { UPDATE_USER } from "../../api/users";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { actionTypesUsers } from "../../redux/action/users";

// ----------------------------------------------------------------------

TableMoreMenu.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function TableMoreMenu({ userSelected, users }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const { fetchData: updateUserByAdmin, loading: del_loading } = useAxios(
    UPDATE_USER(userSelected?.id),
    false
  );
  const dispatch = useDispatch();

  //modal
  const handleCloseModal = () => {
    setIsOpenEditModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenEditModal(true);
    setIsOpen(false);
  };

  const onSuccessAction = (newUpdate) => {
    if (newUpdate) {
      const newData = users.map((item) => {
        if (item.id === userSelected.id) {
          return {
            ...item,
            ...newUpdate,
          };
        } else return item;
      });

      dispatch({ type: actionTypesUsers.SET_USERS_SAGA, data: newData });
    }

    setIsOpenEditModal(false);
    setIsOpen(false);
  };

  const deleteUser = async () => {
    const newUpdate = {
      role: userSelected.role,
      status: "DISABLED",
    };
    const code = await updateUserByAdmin(newUpdate);

    if (code === 0) {
      toast.success("Delete success");

      onSuccessAction(newUpdate);
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          sx={{ color: "text.secondary" }}
          onClick={deleteUser}
          loading={del_loading}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
          onClick={handleOpenModal}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>
      <Dialog
        disableEnforceFocus
        maxWidth="sm"
        fullWidth
        open={isOpenEditModal}
        onClose={handleCloseModal}
      >
        <EditUserModal
          selectedItem={userSelected}
          typeModal={TYPE_MODAL.Edit}
          onClose={handleCloseModal}
          onSuccess={onSuccessAction}
        />
      </Dialog>
    </>
  );
}
