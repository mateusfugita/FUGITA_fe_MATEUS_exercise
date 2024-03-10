import * as React from 'react';
import {ThemeProvider} from 'styled-components';

import {defaultTheme} from 'styles/themes/default';
import Router from 'Router';

const App = () => (
    <ThemeProvider theme={defaultTheme}>
        <Router />
    </ThemeProvider>
);

export default App;
