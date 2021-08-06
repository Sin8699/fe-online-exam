import { Icon } from '@iconify/react';
import arrowheadLeftFill from '@iconify/icons-eva/arrowhead-left-fill';
import chevronLeftFill from '@iconify/icons-eva/chevron-left-fill';
import chevronRightFill from '@iconify/icons-eva/chevron-right-fill';
import arrowheadRightFill from '@iconify/icons-eva/arrowhead-right-fill';
//material
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';

const useStyles1 = makeStyles((theme) => ({
  root: { flexShrink: 0, marginLeft: theme.spacing(2.5) },
}));

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <Icon icon={arrowheadRightFill} width={20} height={20} /> : <Icon icon={arrowheadLeftFill} width={20} height={20} />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <Icon icon={chevronRightFill} width={20} height={20} /> : <Icon icon={chevronLeftFill} width={20} height={20} />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <Icon icon={chevronLeftFill} width={20} height={20} /> : <Icon icon={chevronRightFill} width={20} height={20} />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <Icon icon={arrowheadLeftFill} width={20} height={20} /> : <Icon icon={arrowheadRightFill} width={20} height={20} />}
      </IconButton>
    </div>
  );
}
