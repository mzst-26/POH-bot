
import React, { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSignMessage, useAccount } from 'wagmi';

const queryClient = new QueryClient();

export default function Home() {
  const { open, close } = useWeb3Modal();
  const { data, signMessage } = useSignMessage();
  const {address, isConnecting, isDisconnected } = useAccount();
  const [isClosed, setIsClosed] = useState(false)
  
  
  // useEffect(() => {
  //   if (!data && address) {
  //     signAmessage();
  //   }
  // }, [data, address]);

  async function handleConnectWalletButton() {
    await open(true);
    setIsClosed(false)
    const connectedAddress = await address;
    console.log(await connectedAddress);
    if (connectedAddress) {
      signAmessage();
    }
  
  }

  //disconnect wallet 
  async function Disconnect() {
    await open(false);
    setIsClosed(true)
  
  }

  useEffect(()=>{
    if (isClosed === true){
      // window.location.reload();
    }
  })

  async function signAmessage() {
    const message = 'Sign this message to prove you are human';
    const signedMessage = await signMessage({ message });
 
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`flex flex-row items-center p-24 `}>

        {/* //display the connect wallet button when we don't have the address */}
        {(!address) && <a
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
        </a>}

      {/* //display the sign in button when we don't have the signature */}
        {(!data && address) && 
        <a
        onClick={signAmessage}
        className="border-black group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Sign Wallet{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Sign a message.
        </p>
      </a>}

      {/* //display the disconnect wallet button when we have the address or data */}
      {(data || address) &&
      <a
      onClick={Disconnect}
      className="border-black group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Disconnect Wallet{' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
       Disconnect your wallet
      </p>
    </a>}
        
      </div>
      {address && <p>address: {address}</p>}
        {data && <p>Signature: {data}</p>}



    </QueryClientProvider>
  );
}
