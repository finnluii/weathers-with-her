import { createTheme }  from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: { 
        light: '#2b2f77',
        main: '#141852',
        dark: '#070b34',
        contrastText: '#fff', 
    },
    secondary: {
        light: '#855988',
        main: '#6b4984',
        dark: '#483475',
        contrastText: '#fff',
    }
  },
  typography: {
      button: {
          minHeight: "56px"
      }
  }
})
export default theme;