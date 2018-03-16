// @flow
import { createMuiTheme } from 'material-ui-next/styles';

const theme = createMuiTheme();

theme.typography.formFieldTitle = {
    fontSize: theme.typography.pxToRem(12),
};

theme.palette.warning = {
    light: '#FFF66',
    main: '#FFCC00',
    dark: '#FF9900',
};

export default theme;
