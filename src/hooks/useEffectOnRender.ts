import {useEffect} from 'react';

const useEffectOnRender = (onRender: Function) => {
  useEffect(() => {
    onRender();
  }, []);
};

export default useEffectOnRender;
