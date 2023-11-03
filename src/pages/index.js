
import React, { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSignMessage, useAccount } from 'wagmi';

const queryClient = new QueryClient();

export default function Home() {
  const { open, close } = useWeb3Modal();
  const { data, signMessage } = useSignMessage();
  const {address, isConnecting, isDisconnected } = useAccount();
  
  
  
  // useEffect(() => {
  //   if (!data && address) {
  //     signAmessage();
  //   }
  // }, [data, address]);

  async function handleConnectWalletButton() {
    await open(true);
    const connectedAddress = await address;
    console.log(await connectedAddress);
    if (connectedAddress) {
      signAmessage();
    }
  
  }
  async function Disconnect() {
    await open(false);
  
  }

  async function signAmessage() {
    const message = 'Sign this message to prove you are human';
    const signedMessage = await signMessage({ message });
 
  }

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div className={`flex flex-row items-center p-24 `}>
        {!data && !address && <a
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
        {!data && address && 
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
      {!data && address &&
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
