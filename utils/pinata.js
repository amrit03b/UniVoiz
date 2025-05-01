import axios from 'axios';

export async function uploadToPinata(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
      'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload to Pinata');
  }

  const result = await response.json();
  return result.IpfsHash;
}
