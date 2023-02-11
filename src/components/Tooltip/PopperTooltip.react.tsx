import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';
import { Placement } from '@popperjs/core';

interface Props {
  children: React.ReactNode;
  tooltip: React.ReactNode;
  visible: boolean;
  placement?: Placement;
}

const PopperTooltip = (props: Props) => {
  const { children, tooltip, visible, placement } = props;
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef
  } = usePopperTooltip({ placement });

  return (
    <>
      <span ref={setTriggerRef}>{children}</span>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
        >
          <div
            {...getArrowProps({
              className: 'tooltip-arrow'
            })}
          />
          {tooltip}
        </div>
      )}
    </>
  );
}

export default PopperTooltip;
