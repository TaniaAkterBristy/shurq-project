import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import shurqLogo from "../../public/shurq-white-logo.png"
import Image from 'next/image';
import { FaRegCircleUser } from "react-icons/fa6";
import AddProductContent from '../../components/DashbordContent/AddProductContent/AddProductContent';
import Sidebar from '../../components/sidebar/Sidebar';

const addProduct = () => {
    return (
        <div>
            <div>
                <AppBar className='bg-todoBg'>
                    <Toolbar className='bg-shurqBlue text-white'>
                        <Typography className='w-full flex justify-between items-center' variant="h6" noWrap component="div">
                            <Image
                                src={shurqLogo}
                                width={134}
                                height={48}
                                alt="Picture of the author"
                            />
                            <div className='flex items-center gap-[15px]'>
                                <h2>Richberry</h2>
                                <FaRegCircleUser className='text-3xl' />
                            </div>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className='mt-[64px]'>
                <Sidebar></Sidebar>
            </div>
            <div>
                <AddProductContent></AddProductContent>
            </div>
        </div>
    );
};

export default addProduct;