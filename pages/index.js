import { useEffect, useState } from 'react';
import Web3 from 'web3';
import ReportForm from '../components/ReportForm';
import ReportList from '../components/ReportList';
import CONTRACT_ABI from '../utils/WhistleBlowerABI.json';
import Head from 'next/head';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
console.log('Contract Address:', CONTRACT_ADDRESS); // Debug log

function Home() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.ethereum && window.ethereum.isMetaMask) {
        // MetaMask detected
        const w3 = new Web3(window.ethereum);
        setWeb3(w3);
        console.log('Web3 initialized with MetaMask:', w3.version);
      } else if (window.ethereum) {
        // Some other wallet (e.g., Core Wallet)
        const w3 = new Web3(window.ethereum);
        setWeb3(w3);
        console.log('Web3 initialized with non-MetaMask wallet:', w3.version);
      } else {
        // No wallet detected
        setWeb3(null);
        alert('No Ethereum wallet detected. Please install MetaMask or another compatible wallet.');
      }
    }
  }, []);

  async function connectWallet() {
    try {
      setIsLoading(true);
      if (!window.ethereum) {
        alert('No Ethereum wallet detected. Please install MetaMask or another compatible wallet.');
        setIsLoading(false);
        return;
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      // Debug logs
      console.log('Connected account:', accounts[0]);
      console.log('Contract ABI:', CONTRACT_ABI);
      console.log('Creating contract instance...');
      const c = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      console.log('Contract instance created:', c);
      // Verify contract methods
      console.log('Available contract methods:', Object.keys(c.methods));
      setContract(c);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50 perspective-1000">
      {/* Enhanced animated background with 3D elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200/50 via-blue-200/50 to-indigo-200/50 animate-gradient-slow"></div>
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-sky-300/40 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-blue-300/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] bg-indigo-300/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          
          {/* 3D Floating Elements with enhanced effects */}
          <div className="absolute top-[15%] right-[15%] w-24 h-24 bg-sky-200/30 rounded-lg rotate-12 animate-float-3d transform-style-3d shadow-3d hover-lift transition-3d"></div>
          <div className="absolute bottom-[25%] right-[25%] w-32 h-32 bg-blue-200/30 rounded-full animate-float-3d animation-delay-1000 transform-style-3d shadow-3d hover-lift transition-3d"></div>
          <div className="absolute top-[35%] left-[10%] w-20 h-20 bg-indigo-200/30 rounded-lg -rotate-12 animate-float-3d animation-delay-2000 transform-style-3d shadow-3d hover-lift transition-3d"></div>

          {/* Enhanced 3D Rotating Cube */}
          <div className="absolute top-[20%] left-[40%] w-40 h-40 animate-cube-float transform-style-3d">
            <div className="absolute inset-0 bg-sky-200/20 border-2 border-sky-300/30 transform-gpu rotate-x-45 rotate-y-45 glass-effect"></div>
            <div className="absolute inset-0 bg-blue-200/20 border-2 border-blue-300/30 transform-gpu rotate-x-45 -rotate-y-45 glass-effect"></div>
            <div className="absolute inset-0 bg-indigo-200/20 border-2 border-indigo-300/30 transform-gpu -rotate-x-45 rotate-y-45 glass-effect"></div>
          </div>

          {/* Enhanced 3D Rotating Elements */}
          <div className="absolute bottom-[15%] left-[20%] w-16 h-16 bg-gradient-to-br from-sky-400/20 to-blue-400/20 rounded-lg animate-rotate-3d transform-style-3d shadow-3d hover-lift transition-3d"></div>
          <div className="absolute top-[60%] right-[30%] w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-lg animate-rotate-3d animation-delay-1000 transform-style-3d shadow-3d hover-lift transition-3d"></div>
        </div>
        <div className="absolute inset-0 bg-sky-50/80 backdrop-blur-3xl"></div>
      </div>

      <Head>
        <title>UniVoiz - Anonymous University Issue Reporting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="relative border-b border-sky-200/50 backdrop-blur-sm bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 transition-3d group-hover:scale-110 transform-style-3d">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg animate-pulse-slow"></div>
                <span className="relative flex items-center justify-center w-full h-full bg-white rounded-lg text-2xl">🕵️‍♀️</span>
              </div>
              <span className="text-2xl font-bold font-playfair bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-700 transition-all duration-300 group-hover:from-blue-600 group-hover:to-sky-700">
                UniVoiz
              </span>
            </div>
            {account && (
              <div className="flex items-center gap-3 px-4 py-2 bg-white/80 rounded-lg border border-sky-200/50 shadow-soft hover:shadow-glow transition-3d transform-style-3d hover-lift">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-sky-800 font-mono">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </span>
                </div>
                <div className="w-px h-5 bg-sky-200/50"></div>
                <div className="px-2 py-1 bg-sky-100/50 rounded text-xs text-sky-700">
                  Connected
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-playfair animate-float-3d transform-style-3d hover-lift">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 animate-gradient-slow">
              Anonymous
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 animate-gradient-slow">
              University Issue Reporting
            </span>
          </h1>
          <p className="text-xl text-sky-800 max-w-2xl mx-auto leading-relaxed font-poppins">
            Raise issues faced in your university securely and anonymously on the blockchain.
            <span className="block mt-2 text-sky-600">Your concerns matter. Your identity is never revealed.</span>
          </p>
        </div>

        {!account ? (
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000"></div>
              <button
                onClick={connectWallet}
                disabled={isLoading}
                className="relative px-8 py-4 bg-white text-sky-800 font-semibold rounded-xl hover:bg-sky-50 transition-3d flex items-center gap-3 border border-sky-200/50 shadow-soft hover:shadow-glow font-poppins transform-style-3d hover-lift"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
                      Connecting...
                    </span>
                  </>
                ) : (
                  <>
                    <img src="/metamask-fox.svg" alt="MetaMask" className="w-6 h-6" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600">
                      Connect with MetaMask
                    </span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sky-600 text-sm font-poppins">Connect your wallet to start submitting reports</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-[2px] bg-gradient-to-r from-sky-500/50 to-blue-500/50 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-xl shadow-soft hover:shadow-glow transition-3d p-8 border border-sky-200/50 transform-style-3d hover-lift">
                <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-blue-600 mb-6 font-playfair">
                  Submit a Report
                </h2>
                <ReportForm contract={contract} account={account} />
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500/50 to-indigo-500/50 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-xl shadow-soft hover:shadow-glow transition-3d p-8 border border-sky-200/50 transform-style-3d hover-lift">
                <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 font-playfair">
                  Recent Issues
                </h2>
                <ReportList contract={contract} />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative border-t border-sky-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center font-poppins">
            <span className="text-sky-600 text-sm">Built with </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 font-medium">
              privacy and security
            </span>
            <span className="text-sky-600 text-sm"> in mind. All issues are stored on IPFS and Ethereum.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Update getInitialProps to return meaningful data
Home.getInitialProps = async () => {
  return {
    contractAddress: CONTRACT_ADDRESS,
    title: 'UniVoiz - Anonymous University Issue Reporting',
    description: 'Raise issues faced in your university securely and anonymously on the blockchain.'
  };
};

export default Home;