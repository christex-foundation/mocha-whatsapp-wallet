//@ts-check

import { PublicKey, SystemProgram } from '@solana/web3.js';

async function createPubkeyWithSeed(publicKey, seed) {
  return PublicKey.createWithSeed(publicKey, seed, SystemProgram.programId);
}

const publicKey = new PublicKey('mocaZZMpdRcFpcigpbFyGyqaRiWaGDcbSM1xrM9ZHjo');
const testKey = await createPubkeyWithSeed(publicKey, '+23276242792');
console.log(testKey.toBase58());
