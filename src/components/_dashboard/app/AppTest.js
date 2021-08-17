import { Icon } from "@iconify/react";
import androidFilled from "@iconify/icons-ant-design/android-filled";
// material
import { alpha, styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
// utils
import { fShortenNumber } from "../../../utils/formatNumber";
import {
  LIST_CLIENT_TEST,
  LIST_CLIENT_TEST_BY_ADMIN,
} from "../../../api/client-test";
import useAxios from "../../../hooks/useAxios";
import checkRole from "../../../helpers/checkRole";
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

export default function AppTest() {
  const { isClient } = checkRole();
  const routeCallApi = isClient
    ? LIST_CLIENT_TEST()
    : LIST_CLIENT_TEST_BY_ADMIN();

  const { response: resClientTest } = useAxios(routeCallApi);

  const dataTest = (resClientTest || {}).data || [];
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={androidFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">
        {fShortenNumber(dataTest.length || 0)}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Test
      </Typography>
    </RootStyle>
  );
}
