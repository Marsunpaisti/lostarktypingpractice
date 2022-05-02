import {
  AppBar,
  Button,
  Container,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TypingKeyboard } from './components/TypingKeyboard';
import vykas from './assets/vykas.jpg';
import seto from './assets/seto.jpg';

export const App = () => {
  const [showAppBar, setShowAppBar] = useState(true);
  const [easyMode, setEasyMode] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 25) {
      setShowAppBar(false);
    } else {
      setShowAppBar(true);
    }
  }, [setShowAppBar]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <BrowserRouter>
      <Slide appear={false} direction="down" in={showAppBar}>
        <AppBar
          sx={{
            position: 'fixed',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar sx={{ gap: 4 }}>
            <Typography variant="h5" noWrap>
              Lost Ark Typing Practice
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: easyMode ? 'crimson' : 'green',
                '&:hover': {
                  background: easyMode ? 'crimson' : 'green',
                },
                '&:active': {
                  background: easyMode ? 'crimson' : 'green',
                },
              }}
              onClick={() => setEasyMode((prev) => !prev)}
            >
              {easyMode ? 'Toggle hard mode' : 'Toggle easy mode'}
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
      <Container
        disableGutters
        component="main"
        sx={{
          backgroundImage: easyMode ? `url(${seto})` : `url(${vykas})`,
          backgroundPosition: easyMode ? 'center 50px' : 'center -200px',
          backgroundSize: 'cover',
          pt: 24,
          pb: 2,
          height: '100%',
          minHeight: '100vh',
          minWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TypingKeyboard />
      </Container>
    </BrowserRouter>
  );
};
