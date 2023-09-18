import {UIManager, ViewProps, requireNativeComponent} from 'react-native';
import React, {forwardRef} from 'react';

type Props = ViewProps & {
  onScanned?: (params: {message: string}) => void;
};

export const ScannerManager = requireNativeComponent('ScannerManager');

export const ScannerView = forwardRef((props: Props, ref) => {
  const onChange = (event: any) => {
    if (props.onScanned) {
      props.onScanned(event.nativeEvent);
    }
  };
  return <ScannerManager ref={ref} {...props} onChange={onChange} />;
});

export const createFragment = (viewId: number) =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    UIManager.ScannerManager.Commands.create.toString(),
    [viewId],
  );
