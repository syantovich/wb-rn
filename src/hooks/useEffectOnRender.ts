import {useEffect} from 'react';

const useEffectOnRender = (onRender: Function) => {
  useEffect(() => {
    onRender();
  }, [onRender]);
};

export default useEffectOnRender;
