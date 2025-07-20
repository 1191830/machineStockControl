import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../theme/ColorModeProvider';
import { Link as RouterLink } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'Eletrodomésticos', path: '/eletrodomesticos' },
  { name: 'Vendas', path: '/vendas' },
  { name: 'Arranjos Realizados', path: '/arranjos-realizados' },
  // Future pages can be added here
];

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleColorMode, mode } = useColorMode();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {isMobile && (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleOpenNavMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Gestão de Eletrodomésticos
        </Typography>

        {!isMobile &&
          pages.map((page) => (
            <Button
              key={page.name}
              color="inherit"
              component={RouterLink}
              to={page.path}
              sx={{ ml: 2 }}
            >
              {page.name}
            </Button>
          ))}

        <IconButton sx={{ ml: 2 }} onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
