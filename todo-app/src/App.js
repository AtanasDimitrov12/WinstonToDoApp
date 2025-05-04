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
  CssBaseline
} from '@mui/material';

import ChecklistIcon from '@mui/icons-material/Checklist';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const drawerWidth = 240;

function AppContent() {
  const location = useLocation();

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
            <ChecklistIcon sx={{ color: 'white' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              My TODO App
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'white' }}>
            Welcome, User
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR + MAIN LAYOUT */}
      <Box sx={{ display: 'flex' }}>
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
          <Toolbar /> {/* To make space for AppBar */}
          <List>
            <ListItem
              button
              component={Link}
              to="/"
              selected={location.pathname === '/'}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  color: 'black',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: '#bbdefb',
                },
              }}
            >
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="TODO List" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/about"
              selected={location.pathname === '/about'}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  color: 'black',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: '#bbdefb',
                },
              }}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/help"
              selected={location.pathname === '/help'}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e3f2fd',
                  color: 'black',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: '#bbdefb',
                },
              }}
            >
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Help / FAQ" />
            </ListItem>
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* To offset content below AppBar */}
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
