//@ts-check

import { transferUSDC } from '../../utils/transfer-spl.js';

/**
 * @param {string} fromNumber
 * @param {string} toNumber
 * @param {number} amount
 * @returns {Promise<string>}
 */
export async function transfer(fromNumber, toNumber, amount) {
  // run validation
  // TODO: validate numbers
  // https://twilio.com/docs/lookup/quickstart
  //https://www.twilio.com/docs/glossary/what-e164
  console.log(`Transferrring USDC`, amount);
  // call transfer
  return transferUSDC(fromNumber, toNumber, amount);
}
