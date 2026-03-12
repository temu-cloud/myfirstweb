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
    <nav className='fixed top-0  h-18 lg:h-24  w-full bg-white border-b border-gray-400 z-50'>
      <div className='flex items-center justify-between h-full mx-auto w-[95%] md:w-[90%] '>
        <Logo />
        {/* search */}
        <div onClick={openFilterModal}  className='flex items-center gap-3 px-4 py-2 shadow-md border border-gray-300 rounded-full cursor-pointer '>
          <span className='text-sm font-medium text-gray-700 flex items-center gap-2'>
            <Image src="/images/home.png" alt="Home" width={24} height={24} />
            <span className='h-6 w-px bg-gray-300 hidden md:block' />
            <span className='hidden md:block text-sm font-medium text-gray-700 '>anywhere</span>
            <span className='h-6 w-px bg-gray-300 hidden md:block' />
            <span className='hidden md:block text-sm font-medium text-gray-700 '>any week</span>
            <span className='h-6 w-px bg-gray-300 hidden md:block' />
            <span className='hidden md:block text-sm font-medium text-gray-700 '>add guests</span>
            <div className='w-8 h-8 text-white rounded-full bg-rose-400 grid place-items-center'>
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
              className='hidden md:block text-sm font-medium px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 '>airbnb your home</button>
            )
          }


          <div className='flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 hover:shadow-md transition cursor-pointer '>
            <button onClick={() => setIsMenuOpen((prev) => !prev)} className='h-8 w-8  gird place-items-center rounded-full hover:bg-gray-100 transition cursor-pointer'> <LuMenu className='h-6 w-6 text-rose-400' /> </button>
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
              <div className='absolute top-14 right-0 w-56 bg-pink-200 border border-gray-200 rounded-xl shadow-lg overflow-hidden px-4 py-2 '>
                <ul className='text-gray-800 text-sm'>

                  {
                    session && !isPending && (
                      <>
                        <li onClick={openCreateListing} className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>airbnb your home</li>
                        <Link href="/trips"><li className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>my trips</li></Link>
                        <Link href="/favorites"><li className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>my favorites</li></Link>
                        <Link href="/reservations"><li className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>my reservations</li></Link>
                        <Link href="/properties"><li className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>my properties</li></Link>
                      </>
                    )
                  }

                  <li className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>help center</li>
                  <div className='border-t border-gray-300 my-2' />


                  {
                    session ? (
                      <li onClick={handleLogout} className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>logout</li>
                    ) : (
                      <>
                        <li onClick={() => { OpenRegister() }} className='px-4 py-3 hover:bg-pink-300 cursor-pointer '>sign up</li>
                        <li onClick={() => { OpenLogin() }} className='px-4 py-3 hover:bg-pink-300 cursor-pointer '> sign in</li>

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