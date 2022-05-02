import { AppBar, Container, Slide, Toolbar, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  const [showAppBar, setShowAppBar] = useState(true);

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
          <Toolbar>
            <Typography variant="h5" noWrap>
              Lost Ark Typing Practice
            </Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Container
        disableGutters
        maxWidth={false}
        component="main"
        sx={{ pt: 2, pb: 2 }}
      ></Container>
    </BrowserRouter>
  );
};
