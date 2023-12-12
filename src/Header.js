import { Avatar } from '@mui/material';

import React from 'react';
const Header = () => {
    return( 
        <>
            <div className="flex justify-between p-5 sticky top-0 bg-black">
                <div className="text-white text-3xl md:text-5xl font-bold">Sushant Nandwani</div>
                <Avatar src='/about-me.jpg'/>

            </div>
        </>

    )

};
export default Header;