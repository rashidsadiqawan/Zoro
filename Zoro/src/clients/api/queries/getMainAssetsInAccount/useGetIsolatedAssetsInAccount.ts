import { QueryObserverOptions, useQuery } from 'react-query';
import { getContractAddress } from 'utilities';

import getMainAssetsInAccount, {
  GetMainAssetsInAccountInput,
  GetMainAssetsInAccountOutput,
} from 'clients/api/queries/getMainAssetsInAccount';
import { useComptrollerContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const mainPoolComptrollerAddress = getContractAddress('degen:comptroller');

type Options = QueryObserverOptions<
  GetMainAssetsInAccountOutput,
  Error,
  GetMainAssetsInAccountOutput,
  GetMainAssetsInAccountOutput,
  [FunctionKey.GET_ISOLATED_ASSETS_IN_ACCOUNT, Omit<GetMainAssetsInAccountInput, 'comptrollerContract'>]
>;

const useGetIsolatedAssetsInAccount = (
  { accountAddress }: Omit<GetMainAssetsInAccountInput, 'comptrollerContract'>,
  options?: Options,
) => {
  const comptrollerContract = useComptrollerContract(mainPoolComptrollerAddress);

  return useQuery(
    [FunctionKey.GET_ISOLATED_ASSETS_IN_ACCOUNT, { accountAddress }],
    () => getMainAssetsInAccount({ comptrollerContract, accountAddress }),
    options,
  );
};

export default useGetIsolatedAssetsInAccount;
