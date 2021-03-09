import { ContractPromise } from '@polkadot/api-contract';
import { useCallback } from 'react';

export type ContractQueryProps = {
  contract: ContractPromise;
  method: string;
};

export const contractQuery = async (
  currentAccount: string,
  contract: ContractPromise,
  method: string,
  ...fields: any[]
) => {
  const data = await contract.query[method](currentAccount, {}, ...fields);

  if (data.output?.isEmpty) {
    return null;
  }

  return data.output?.toJSON();
};

export const useContractQuery = ({ contract, method }: ContractQueryProps) => {
  const currentAccount = '5C8R1N8L6jZJu9Cm4RzdASggyjfzCBJgxFMMq1PDHeraw7eJ';

  const read = useCallback(
    async (...fields: any[]) => {
      return contractQuery(currentAccount, contract, method, ...fields);
    },
    [currentAccount, contract, method]
  );

  return {
    read
  };
};
