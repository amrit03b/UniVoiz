# UniVoiz

UniVoiz is a decentralized application (dApp) built with Next.js and Hardhat. It allows users to submit anonymous reports about issues they face at their university. The reports are stored on IPFS and the Ethereum blockchain, ensuring privacy and security.

## Features

- **Anonymous Report Submission**: Users can submit reports anonymously.
- **File Upload**: Support for uploading PDF, TXT, DOC, DOCX, and JPEG files (max 10MB).
- **IPFS Integration**: Reports are stored on IPFS for decentralized storage.
- **Blockchain Integration**: Reports are linked to the Ethereum blockchain for immutability.
- **Modern UI**: Built with Tailwind CSS for a responsive and modern user interface.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MetaMask or any Ethereum wallet
- Hardhat (for local blockchain development)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amrit03b/UniVoiz.git
   cd UniVoiz
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```
   NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
   NEXT_PUBLIC_PINATA_SECRET_API_KEY=your_pinata_secret_api_key
   ```

4. **Compile and deploy the smart contract:**

   ```bash
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network localhost
   ```

5. **Start the local development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

## Usage

- Connect your Ethereum wallet (MetaMask) to the application.
- Fill out the report form with details about the issue.
- Optionally, upload supporting documents.
- Submit the report. The report will be stored on IPFS and linked to the blockchain.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
