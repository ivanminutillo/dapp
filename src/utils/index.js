
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import {utils } from 'ethers'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function encodeParameters(types, values) {
  const abi = new utils.AbiCoder();
  return abi.encode(types, values);
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked()
}


// account is optional
export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address, ABI, library, account) {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account))
}