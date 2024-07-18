import SellerDashboardBox from '@/Components/SellerDashboardBox';
import React from 'react'

const SellerDashboardlayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='flex w-full'>
            <SellerDashboardBox />
            <div className="flex-0 w-full">
                {children}
            </div>
        </div>
    )
}

export default SellerDashboardlayout
