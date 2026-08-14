"use client";
import React, { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { LuMenu, LuSearch } from 'react-icons/lu'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa6'
import { useAuthModal } from '@/app/store/useAuthModalSrote';
import { authClient } from '@/app/lib/auth-client';
import Link from 'next/link';
 
import { useRouter } from 'next/navigation';
import { useCreateListingModal } from '@/app/store/useCreateListingModal';
import { useFilterModal } from '@/app/store/useFilterListingModal';
function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const { OpenRegister, OpenLogin } = useAuthModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {open:openCreateListing}=useCreateListingModal();
  const router=useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null)
   const {open:openFilterModal} = useFilterModal();
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, []);
  const handleLogout= async()=>{
   await authClient.signOut();
   router.refresh();
  }
  return (
    <nav className='fixed top-0  h-18 lg:h-24  w-full bg-[#07191E] border-b border-[#02F5A1]/20 z-50'>
      <div className='flex items-center justify-between h-full mx-auto w-[95%] md:w-[90%] '>
        <Logo />
        {/* search */}
        <div onClick={openFilterModal}  className='flex items-center gap-3 px-4 py-2 shadow-md border border-[#02F5A1]/30 rounded-full cursor-pointer hover:border-[#02F5A1] transition'>
          <span className='text-sm font-medium text-[#02F5A1] flex items-center gap-2'>
            <Image src="/images/home.png" alt="Home" width={24} height={24} />
            <span className='h-6 w-px bg-[#02F5A1]/30 hidden md:block' />
            <span className='hidden md:block text-sm font-medium text-[#02F5A1] '>anywhere</span>
            <span className='h-6 w-px bg-[#02F5A1]/30 hidden md:block' />
            <span className='hidden md:block text-sm font-medium text-[#02F5A1] '>any week</span>
            <span className='h-6 w-px bg-[#02F5A1]/30 hidden md:block' />
            <span className='hidden md:block text-sm font-medium text-[#02F5A1] '>add guests</span>
            <div className='w-8 h-8 text-[#07191E] rounded-full bg-[#02F5A1] grid place-items-center'>
              <LuSearch size={16} />
            </div>
          </span>

        </div>
        {/* user menu */}
        <div className='flex items-center gap-4 relative' ref={menuRef}>

          {
            session && !isPending && (
              <button 
              onClick={openCreateListing}
              className='hidden md:block text-sm font-medium px-4 py-2 rounded-full border border-[#02F5A1]/30 text-[#02F5A1] hover:bg-[#02F5A1]/10 transition'>airbnb your home</button>
            )
          }


          <div className='flex items-center gap-2 border border-[#02F5A1]/30 rounded-full px-2 py-1 hover:border-[#02F5A1] transition cursor-pointer '>
            <button onClick={() => setIsMenuOpen((prev) => !prev)} className='h-8 w-8  gird place-items-center rounded-full hover:bg-[#02F5A1]/10 transition cursor-pointer'> <LuMenu className='h-6 w-6 text-[#02F5A1]' /> </button>
            {
              session && (
                <div className='relative h-8 w-8 rounded-full overflow-hidden'>
                  {session.user.image ? (
                    <Image src={session.user.image} alt="avatar" fill className='object-cover' />
                  ) : (
                    <FaUser className='h-6 w-6 text-gray-400' />
                  )}

                </div>
              )
            }
            {/*dropdown menu*/}
            {isMenuOpen && (
              <div className='absolute top-14 right-0 w-56 bg-[#07191E] border border-[#02F5A1]/20 rounded-xl shadow-lg overflow-hidden px-4 py-2 '>
                <ul className='text-[#02F5A1] text-sm'>

                  {
                    session && !isPending && (
                      <>
                        <li onClick={openCreateListing} className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>airbnb your home</li>
                        <Link href="/trips"><li className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>my trips</li></Link>
                        <Link href="/favorites"><li className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>my favorites</li></Link>
                        <Link href="/reservations"><li className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>my reservations</li></Link>
                        <Link href="/properties"><li className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>my properties</li></Link>
                      </>
                    )
                  }

                  <li className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>help center</li>
                  <div className='border-t border-[#02F5A1]/20 my-2' />


                  {
                    session ? (
                      <li onClick={handleLogout} className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>logout</li>
                    ) : (
                      <>
                        <li onClick={() => { OpenRegister() }} className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'>sign up</li>
                        <li onClick={() => { OpenLogin() }} className='px-4 py-3 hover:bg-[#02F5A1]/10 cursor-pointer rounded-lg'> sign in</li>

                  </>
                  )
                   }
                </ul>
              </div>
            )

            }
          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar