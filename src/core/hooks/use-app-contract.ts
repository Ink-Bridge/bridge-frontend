import { useContract } from './use-contract';
import AppABI from '../contracts/application.json';
import { ApplicationAddr } from '../contracts/contract-address';

export const useAppContract = () => {
  return useContract(ApplicationAddr, AppABI);
};