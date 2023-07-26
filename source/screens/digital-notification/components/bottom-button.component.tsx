import React from 'react';
import Button from '@/components/button.component';
import BottomContainer from '@/components/bottom-container.component';

type Props = React.ComponentProps<typeof Button>;

const BottomButton = ({children, ...props}: Props) => {
  return (
    <BottomContainer>
      <Button mode="contained" {...props}>
        {children}
      </Button>
    </BottomContainer>
  );
};

export default BottomButton;
