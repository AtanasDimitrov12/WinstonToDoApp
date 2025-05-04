import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GlobalStateProvider } from './context/GlobalStateProvider';
import TodoPage from './pages/TodoPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  IconButton,
  useMediaQuery
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function AppContent() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar />
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          selected={location.pathname === '/'}
          onClick={() => setMobileOpen(false)}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#e3f2fd',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: '#bbdefb',
            },
          }}
        >
          <ListItemIcon><ChecklistIcon /></ListItemIcon>
          <ListItemText primary="TODO List" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/about"
          selected={location.pathname === '/about'}
          onClick={() => setMobileOpen(false)}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#e3f2fd',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: '#bbdefb',
            },
          }}
        >
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/help"
          selected={location.pathname === '/help'}
          onClick={() => setMobileOpen(false)}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#e3f2fd',
              fontWeight: 'bold',
            },
            '&:hover': {
              backgroundColor: '#bbdefb',
            },
          }}
        >
          <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
          <ListItemText primary="Help / FAQ" />
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <CssBaseline />
      {/* TOP NAVIGATION BAR */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <ChecklistIcon sx={{ color: 'white' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              My TODO App
            </Typography>
          </Box>
          {!isMobile && (
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'white' }}>
              Welcome, User
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex' }}>
        {/* MOBILE DRAWER */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          // DESKTOP DRAWER
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalStateProvider>
  );
}
