"use client";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MdContactMail, MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from '@mui/material';
// import HomeMainContent from '../HomeMainContent/HomeMainContent';
import { FaHome } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BiLogOutCircle } from "react-icons/bi";
import Link from 'next/link';
// import { AuthContext } from '@/app/providers/AuthProvider/AuthProvider';
import shurqLogo from "../../public/shurq-white-logo.png"
import Image from 'next/image';
import { RiDeleteBin7Line } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineLayers } from "react-icons/md";
import { LuSearchCheck } from "react-icons/lu";
import { TbCrane } from "react-icons/tb";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import dashboardIcon from "../../public/dashboard-icon.png"

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Sidebar = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    // const {user, logOut} = React.useContext(AuthContext)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Box sx={{ display: 'flex' }} className="mt-[64px]">
                <CssBaseline />

                <Drawer className='bg-todoBg' variant="permanent" open={open}>
                    {
                        open ? '' :
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: 'none' }),
                                }}
                                className='block w-full -ml-5'
                            >
                                <MenuIcon></MenuIcon>

                            </IconButton>
                    }

                    <DrawerHeader className='bg-todoBg'>
                        <IconButton className='text-todoWhite' onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? '' : <ChevronLeftIcon className='text-todoWhite' />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List className='bg-todoBg text-todoWhite'>

                        {/* dashboard section */}
                        <a href="/">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <MdOutlineDashboard className='text-3xl hover:text-shurqBlue text-black justify-center' />
                                    </ListItemIcon>
                                    Dashboard
                                </ListItemButton>
                            </ListItem>
                        </a>
                        <Link href="/dashboard/add-product">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <LuSearchCheck className='text-3xl hover:text-shurqBlue text-black justify-center' />
                                    </ListItemIcon>
                                    Add Product
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        {/* cart section */}
                        <a href="/contact">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <RiDeleteBin7Line className='text-2xl hover:text-shurqBlue text-black justify-center' />
                                    </ListItemIcon>
                                    Cart
                                </ListItemButton>
                            </ListItem>
                        </a>

                        {/* shopping section */}
                        <a href="/settings">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <LocalShippingIcon className='text-2xl hover:text-shurqBlue text-black justify-center'></LocalShippingIcon>
                                    </ListItemIcon>
                                    Shopping
                                </ListItemButton>
                            </ListItem>
                        </a>
                        
                        {/* idea section */}
                        <a href="/settings">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <HiOutlineLightBulb className='text-2xl hover:text-shurqBlue text-black justify-center' />
                                    </ListItemIcon>
                                    Idea
                                </ListItemButton>
                            </ListItem>
                        </a>
                        {/* PrecisionManufacturingIcon section */}
                        <a href="/settings">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <PrecisionManufacturingIcon className='text-2xl hover:text-shurqBlue text-black justify-center'></PrecisionManufacturingIcon>
                                    </ListItemIcon>
                                    Home
                                </ListItemButton>
                            </ListItem>
                        </a>
                        {/* Layers section */}
                        <a href="/settings">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <MdOutlineLayers className='text-2xl hover:text-shurqBlue text-black justify-center' />
                                    </ListItemIcon>
                                    Layers
                                </ListItemButton>
                            </ListItem>
                        </a>
                        {/* settings section */}
                        <a href="/settings">
                            <ListItem className='block w-full -ml-5'>
                                <ListItemButton

                                >
                                    <ListItemIcon>
                                        <IoSettingsOutline className='text-2xl hover:text-shurqBlue text-black justify-center' />
                                    </ListItemIcon>
                                    Settings
                                </ListItemButton>
                            </ListItem>
                        </a>

                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Typography>
                        {/* <HomeMainContent></HomeMainContent> */}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default Sidebar;