"use client"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


function page({searchParams}) { 
    const parms=usePathname()
    const searchquery=useSearchParams();
    console.log(searchParams)
    console.log(parms)
    const  route= useRouter()
    const handleClick = () =>{
        console.log("handleClick") 
        route.refresh();
    }
  return (
    <div>
        <Link href="/" prefetch={false} >
          Go to Homepage
          <button onClick={handleClick}>click here</button>
        </Link>     
    </div>
  )
}

export default page