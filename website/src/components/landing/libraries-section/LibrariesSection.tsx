import React from 'react';
import Tooltip from 'headless-tooltip';
import './LibrariesSection.css';

function LibrariesSection() {
  const floatingTooltips = [
    {
      id: 1,
      content: 'Styled like Material-UI tooltip',
      className: 'library-material-ui',
      arrowSize: 9,
      x: 10,
      y: 15,
    },
    {
      id: 2,
      content: 'Styled like Ant Design tooltip',
      className: 'library-ant-design',
      arrowSize: 11,
      x: 85,
      y: 25,
    },
    {
      id: 3,
      content: 'Styled like Bootstrap tooltip',
      className: 'library-bootstrap',
      arrowSize: 9,
      x: 20,
      y: 60,
    },
    {
      id: 4,
      content: 'Styled like Chakra UI tooltip',
      className: 'library-chakra-ui',
      arrowSize: 11,
      x: 75,
      y: 70,
    },
    {
      id: 5,
      content: 'Styled like Mantine tooltip',
      className: 'library-mantine',
      arrowSize: 9,
      x: 50,
      y: 20,
    },
    {
      id: 6,
      content: 'Styled like React Suite tooltip',
      className: 'library-react-suite',
      arrowSize: 11,
      x: 30,
      y: 80,
    },
    {
      id: 7,
      content: 'Styled like Semantic UI tooltip',
      className: 'library-semantic-ui',
      arrowSize: 9,
      x: 90,
      y: 45,
    },
    {
      id: 8,
      content: 'Styled like NextUI tooltip',
      className: 'library-next-ui',
      arrowSize: 11,
      x: 15,
      y: 40,
    },
    {
      id: 9,
      content: 'Styled like Tailwind tooltip',
      className: 'library-tailwind-ui',
      arrowSize: 9,
      x: 65,
      y: 15,
    },
    {
      id: 10,
      content: 'Styled like Headless UI tooltip',
      className: 'library-headless-ui',
      arrowSize: 9,
      x: 40,
      y: 75,
    },
    {
      id: 11,
      content: 'Styled like React Bootstrap tooltip',
      className: 'library-react-bootstrap',
      arrowSize: 9,
      x: 80,
      y: 35,
    },
    {
      id: 12,
      content: 'Styled like Grommet tooltip',
      className: 'library-grommet',
      arrowSize: 10,
      x: 25,
      y: 50,
    },
    {
      id: 13,
      content: 'Styled like Evergreen tooltip',
      className: 'library-evergreen',
      arrowSize: 11,
      x: 70,
      y: 85,
    },
    {
      id: 14,
      content: 'Styled like Rebass tooltip',
      className: 'library-rebass',
      arrowSize: 7,
      x: 55,
      y: 30,
    },
    {
      id: 15,
      content: 'Styled like Theme UI tooltip',
      className: 'library-theme-ui',
      arrowSize: 9,
      x: 35,
      y: 65,
    },
    {
      id: 16,
      content: 'Styled like Primer tooltip',
      className: 'library-primer',
      arrowSize: 11,
      x: 85,
      y: 55,
    },
    {
      id: 17,
      content: 'Styled like Carbon tooltip',
      className: 'library-carbon',
      arrowSize: 7,
      x: 45,
      y: 85,
    },
    {
      id: 18,
      content: 'Styled like Fluent UI tooltip',
      className: 'library-fluent-ui',
      arrowSize: 9,
      x: 60,
      y: 40,
    },
    {
      id: 19,
      content: 'Styled like Polaris tooltip',
      className: 'library-polaris',
      arrowSize: 11,
      x: 20,
      y: 25,
    },
    {
      id: 20,
      content: 'Styled like AtlasKit tooltip',
      className: 'library-atlaskit',
      arrowSize: 11,
      x: 75,
      y: 60,
    },
  ];

  return (
    <section className="floating-tooltips-section">
      <div className="floating-background">
        <h2 className="floating-title">Works with Any Design System</h2>
        <p className="floating-subtitle">
          Seamlessly integrate with your favorite UI library. Every tooltip can
          be styled to match your design perfectly.
        </p>
        <div className="floating-container">
          {floatingTooltips.map((tooltip) => (
            <div
              key={tooltip.id}
              className="floating-tooltip-wrapper"
              style={{
                left: `${tooltip.x}%`,
                top: `${tooltip.y}%`,
                animationDelay: `${tooltip.id * 0.2}s`,
              }}
            >
              <Tooltip
                content={tooltip.content}
                open={true}
                placement="top"
                arrow={true}
                arrowSize={tooltip.arrowSize}
                className={tooltip.className}
                disableInteractive={false}
              >
                <div className="invisible-trigger" />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LibrariesSection;
