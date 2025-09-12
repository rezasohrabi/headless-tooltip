import './TooltipContent.css';

import React from 'react';

interface TooltipContentProps {
  title: string;
  message: string;
}

function TooltipContent({ title, message }: TooltipContentProps) {
  return (
    <div className="tooltip-content">
      <div className="tooltip-header">
        <span className="tooltip-title">{title}</span>
      </div>
      <div className="tooltip-body">
        <strong>{message}</strong>
        <br />
        {message}
        <br />
      </div>
    </div>
  );
}

export default TooltipContent;
