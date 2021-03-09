import { ApiPromise, WsProvider } from '@polkadot/api';
import { Abi, ContractPromise } from '@polkadot/api-contract';
import { useCallback, useState } from 'react';

const wsProvider = new WsProvider('wss://rpc.polkadot.io');

export const useContractFactory = () => {
  const [ api, setAPI ] = useState<ApiPromise>();

  ApiPromise.create({ provider: wsProvider }).then(api => setAPI(api));

  return useCallback(
    (address: string, abi: any) => {
      if (!address || !api) {
        throw new Error('Unexpected');
      }

      return {
        contract: new ContractPromise(api, abi, address),
        abi: new Abi(abi),
        abiJSON: abi
      };
    },
    [api]
  );
};
