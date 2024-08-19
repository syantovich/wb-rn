import useModuleTranslation from '../../../hooks/useModuleTranslation';
import {authModuleName} from '../constants';

const useThisModuleTranslation = () => useModuleTranslation(authModuleName);
export default useThisModuleTranslation;
