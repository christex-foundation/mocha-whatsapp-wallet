//@ts-check
import { getOrCreateUserTokenAccount } from './wallet.mjs';
import { transfer } from '@solana/spl-token';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

const connection = new Connection(clusterApiUrl('devnet'));
const MOCHA_KEYPAIR = process.env.MOCHA_SECRET_KEY;

/**
 * @param {string} fromNumber
 * @param {string} toNumber
 * @param {number} amount
 * @returns {Promise<string>}
 * @description Transfer USDC from one user to another
 *
 */
export async function transferUSDC(fromNumber, toNumber, amount) {
  const fromWhatsappUserAccount = await getOrCreateUserTokenAccount(MOCHA_KEYPAIR, fromNumber);
  const toWhatsappUserAccount = await getOrCreateUserTokenAccount(MOCHA_KEYPAIR, toNumber);

  // fix amount
  let parsedAmount = new BigNumber(amount).multipliedBy(10 ** 6).toNumber();

  return await transfer(
    connection,
    MOCHA_KEYPAIR,
    fromWhatsappUserAccount,
    toWhatsappUserAccount,
    MOCHA_KEYPAIR,
    parsedAmount,
    undefined,
    {
      skipPreflight: true,
      commitment: 'processed',
    },
  );
}
