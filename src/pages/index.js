import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react'

// import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const {} = useAccount()
  // const {} = useSignMessage()

  // get the open and close hooks 
  const {open, close} = useWeb3Modal();


  //handle button when clicked
  async function handleConnectWalletButton(){
    const d =  await open(true)
    
  }
  
  return (
   
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

    <div className={`flex flex-row items-center justify-between p-24 `}>

      <a 
          onClick={handleConnectWalletButton}
          className="border-black group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Connect Wallet{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Connect your wallet and sign a message.
          </p>
        </a>


      </div>
    </main>


    
  )
}
