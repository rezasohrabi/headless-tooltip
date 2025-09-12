import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'headless-tooltip';
import './AutoPlayTooltips.css';
import Meteorite from '@site/static/img/meteorite.png';
import Sun from '@site/static/img/sun.png';
import Earth from '@site/static/img/earth.png';
import Satellite from '@site/static/img/sattelite.png';
import Star from '@site/static/img/star.png';
import Plannet from '@site/static/img/plannet.png';
import Rock from '@site/static/img/rock.png';
import Moon from '@site/static/img/moon.png';
import PinkCircle from '@site/static/img/pink-circle.png';
import SatelliteMono from '@site/static/img/sattelite-mono.png';
import TooltipContent from './TooltipContent';

const triggers = [
  {
    id: 1,
    x: 15,
    y: 20,
    tooltip: '⚡ Lightning Fast',
    message: 'Optimized for performance!',
    animation: 'bounce-in-out',
    icon: <img src={Sun} width={60} height={60} alt="sun" />,
  },
  {
    id: 2,
    x: 75,
    y: 15,
    tooltip: '🎨 Modern Design',
    message: 'Beautiful dark theme UI!',
    animation: 'back-in-out',
    icon: <img src={Plannet} width={45} height={45} alt="sun" />,
  },
  {
    id: 3,
    x: 20,
    y: 70,
    tooltip: '🔥 Smooth Animations',
    message: 'Buttery smooth transitions!',
    animation: 'flip-in-out-x',
    icon: <img src={Rock} width={45} height={45} alt="sun" />,
  },
  {
    id: 4,
    x: 89,
    y: 69,
    tooltip: '🎯 Precise Positioning',
    message: 'Pixel-perfect placement!',
    animation: 'zoom-in-out-down',
    icon: <img src={Star} width={45} height={45} alt="sun" />,
  },
  {
    id: 5,
    x: 50,
    y: 55,
    tooltip: '🚀 Next-Gen UX',
    message: 'The future of tooltips!',
    animation: 'fade-in-out-bottom-left',
    icon: <img src={Earth} width={50} height={50} alt="sun" />,
  },
  {
    id: 6,
    x: 30,
    y: 85,
    tooltip: '💎 Premium Quality',
    message: 'Enterprise-grade components!',
    animation: 'rotate-in-out',
    icon: <img src={Moon} width={45} height={45} alt="sun" />,
  },
  {
    id: 7,
    x: 50,
    y: 25,
    tooltip: '⭐ Developer First',
    message: 'Built for modern workflows!',
    animation: 'hinge-in-out',
    icon: (
      <img
        src={Meteorite}
        width={45}
        height={45}
        alt="meteorite"
        style={{
          transform: 'rotate(90deg)',
        }}
      />
    ),
  },
  {
    id: 9,
    x: 58,
    y: 90,
    tooltip: '💎 Premium Quality',
    message: 'Enterprise-grade components!',
    animation: 'zoom-in-out',
    icon: <img src={Satellite} width={45} height={45} alt="sun" />,
  },
  {
    id: 10,
    x: 40,
    y: 40,
    tooltip: '💎 Premium Quality',
    message: 'Enterprise-grade components!',
    animation: 'slide-in-out',
    icon: <img src={PinkCircle} width={45} height={45} alt="sun" />,
  },
  {
    id: 11,
    x: 60,
    y: 60,
    tooltip: '💎 Premium Quality',
    message: 'Enterprise-grade components!',
    animation: 'light-speed-in-out',
    icon: <img src={SatelliteMono} width={40} height={40} alt="sun" />,
  },
];

function AutoPlayTooltips() {
  const [activeTrigger, setActiveTrigger] = useState(1);

  const [isOpen, setIsOpen] = useState(new Array(triggers.length).fill(false));

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const runCycle = (index: number) => {
      // 1) OPEN tooltip
      setIsOpen((prev) => prev.map((_, i) => i === index));
      setActiveTrigger(index);

      // 2) Keep it open (400ms for animation + 200ms visible = 600ms total)
      timeout = setTimeout(() => {
        // 3) CLOSE tooltip (200ms for exit animation)
        setIsOpen((prev) => prev.map(() => false));

        timeout = setTimeout(() => {
          // 4) Move to next tooltip
          const nextIndex = (index + 1) % triggers.length;
          runCycle(nextIndex);
        }, 400); // exit animation
      }, 1400); // open duration + visible time
    };

    runCycle(0); // start with first tooltip

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [triggers.length]);

  return (
    <div>
      {triggers.map((trigger, index) => (
        <Tooltip
          placement="top"
          arrow
          arrowClassName="tooltip-arrow"
          open={isOpen[index]}
          zIndex={2000}
          openDelay={0}
          closeDelay={0}
          key={trigger.id}
          className={trigger.animation}
          transition={{
            enable: true,
            enterDuration: 400,
            exitDuration: 400,
          }}
          tabIndex={index}
          content={
            <TooltipContent title={trigger.tooltip} message={trigger.message} />
          }
        >
          <button
            className="tooltip-trigger"
            style={{
              left: `${trigger.x}%`,
              top: `${trigger.y}%`,
              animationDelay: `${index * 0.3}s`,
            }}
            aria-label={`Trigger ${index + 1}: ${trigger.tooltip}`}
          >
            {trigger.icon}
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

export default AutoPlayTooltips;
