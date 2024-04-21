'use client'
// Components/Header.js
import React, { useRef , useContext } from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, createTheme, makeStyles } from '@material-ui/core';
import { CryptoContext } from '../../../app/Market/context/Crypto/testCrypto';

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    cursor: "pointer",
  },
  toolbar: {
    justifyContent: "flex-end", // Align the items to the right side of the toolbar
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    type: "light",
  },
});

function Header() {
  const classes = useStyles();
  const inputRef = useRef(null);
  let { currency, setCurrency } = useContext(CryptoContext); // Use the useAppContext hook here

  // function handleCurrencyChange(e) {
  //   setCurrency(e.target.value);
  // }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar className={classes.toolbar}>
            <Select ref={inputRef} defaultValue="inr" 
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                backgroundColor: "#f0f3fa"
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"inr"}>INR</MenuItem>
              <MenuItem value={"usd"}>USD</MenuItem>
              <MenuItem value={"eur"}>EURO</MenuItem>
              <MenuItem value={"jpy"}>JPY</MenuItem>
              <MenuItem value={"rub"}>RUB</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
