import React from 'react';
import { InsightContext } from '../types-enhanced';

interface TooltipProps {
  context: InsightContext;
  visible: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ context, visible, position = 'top', children }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({ x: rect.left, y: rect.top });
    }
    // 100ms delay for smooth UX
    setTimeout(() => setShowTooltip(true), 100);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="tooltip-wrapper"
    >
      {children}
      
      {showTooltip && (
        <div 
          className={`
            absolute z-50 bg-black text-white p-4 shadow-xl
            min-w-[280px] max-w-[400px]
            transition-opacity duration-150
            ${position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : ''}
            ${position === 'bottom' ? 'top-full mt-2 left-1/2 -translate-x-1/2' : ''}
            ${position === 'left' ? 'right-full mr-2 top-1/2 -translate-y-1/2' : ''}
            ${position === 'right' ? 'left-full ml-2 top-1/2 -translate-y-1/2' : ''}
          `}
          data-testid="tooltip-content"
          role="tooltip"
          aria-live="polite"
        >
          {/* Timestamp & Speaker */}
          {(context.timestamp || context.speaker) && (
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
              {context.timestamp && (
                <span className="text-xs font-mono bg-gray-800 px-2 py-1 text-gray-300">
                  {context.timestamp}
                </span>
              )}
              {context.speaker && (
                <span className="text-xs text-gray-400">
                  {context.speaker}
                </span>
              )}
            </div>
          )}

          {/* Quote */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Quote</p>
            <p className="text-sm italic leading-relaxed">"{context.quote}"</p>
          </div>

          {/* AI Reasoning */}
          <div className="mb-2">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">AI Reasoning</p>
            <p className="text-xs text-gray-300 leading-relaxed">{context.reasoning}</p>
          </div>

          {/* Confidence Score */}
          {context.confidence !== undefined && (
            <div className="mt-3 pt-2 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Confidence</span>
                <span className="text-xs font-mono text-white">
                  {Math.round(context.confidence * 100)}%
                </span>
              </div>
              <div className="mt-1 h-1 bg-gray-700">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${context.confidence * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Arrow pointer */}
          <div 
            className={`
              absolute w-2 h-2 bg-black transform rotate-45
              ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
