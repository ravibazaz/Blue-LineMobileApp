import React from 'react'
import MainStack from './Screen/MainStack'
import { ThemeProvider } from '@shopify/restyle'
import { darkTheme, lightTheme } from "./theme"
export default function App() {
  const theme = "light";
  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <MainStack />
      </ThemeProvider>
  )
}