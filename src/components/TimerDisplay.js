import * as React from 'react';
import { Typography } from '@material-ui/core';
import { secondsToHmsDisplay } from '../helpers/timer';

const DisplayTimer = ({ time }) => {
  const [counter, setCounter] = React.useState(time);

  React.useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 10);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>
      <Typography variant="h6" align="right">
        Thời gian: {secondsToHmsDisplay(counter)}
      </Typography>
    </div>
  );
};

export default React.memo(DisplayTimer);
