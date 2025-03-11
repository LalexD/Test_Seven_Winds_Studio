import React, { useEffect, useRef, useState } from 'react';

const ConnectLine = ({
  parentRef,
  childRef,
  isNeedUpdate,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  childRef: React.RefObject<HTMLDivElement>;
  isNeedUpdate?: boolean;
}) => {
  const [line, setLine] = useState<{ x1: number; y1: number; x2: number; y2: number }>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  useEffect(() => {
    if (!childRef.current || !parentRef.current) return;

    const updateLine = () => {
      if (parentRef.current && childRef.current) {
        const rect1 = parentRef.current.getBoundingClientRect();
        const rect2 = childRef.current.getBoundingClientRect();

        setLine({
          x1: -8,
          y1: -(rect2.top - rect1.bottom + rect1.height / 2),
          x2: 0,
          y2: rect2.height / 2,
        });
      }
    };

    updateLine();
    const observer = new ResizeObserver(updateLine);
    observer.observe(childRef.current);
    return () => observer.disconnect();
  }, [parentRef, childRef, isNeedUpdate]);

  return (
    <svg className="svg-line">
      <line x1={line.x1} y1={line.y1} x2={line.x1} y2={line.y2} stroke="white" strokeWidth="1" />
      <line x1={line.x1} y1={line.y2} x2={line.x2} y2={line.y2} stroke="white" strokeWidth="1" />
    </svg>
  );
};

export default ConnectLine;
