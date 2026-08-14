import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
function Logo() {
  return (
    <Link href="/">
        <Image 
        src="/images/log.jpeg" 
        alt="Logo" 
        width={60} 
        height={60} />
    </Link>
  )
}

export default Logo