"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import EmptyState from './EmptyState';
import Link from 'next/link';



function Listing() {
    const { user } = useUser();
    const [userRoomList, setUserRoomList] = useState([]);
    const [openDialog,setOpenDialog]=useState(false);
    const [selectedRoom,setSelectedRoom]=useState()
    useEffect(()=>{
        user&&GetUserRoomList();
    },[user])

    const GetUserRoomList=async()=>{
        const result=await db.select().from(AiGeneratedImage)
        .where(eq(AiGeneratedImage.userEmail,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc( AiGeneratedImage.id))
        
        setUserRoomList(result);
        console.log(result);
    }
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button>+ Redesign Room</Button>
                </Link>
            </div>


            {userRoomList?.length == 0 ?
                <EmptyState />
                :
                <div>
                    
                    {/* Listing  */}
                    
                </div>
            }
 
        </div>
    )
}

export default Listing