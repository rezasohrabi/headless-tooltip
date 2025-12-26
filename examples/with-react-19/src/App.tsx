import Tooltip from 'headless-tooltip';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Headless Tooltip Example
        </h1>
        <p className="text-gray-600 mb-8">React 19 + Vite + Tailwind CSS v4</p>

        <div className="space-y-6">
          {/* Basic Tooltip */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Basic Tooltip
            </h2>
            <div className="flex gap-4">
              <Tooltip content="This is a basic tooltip">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Hover me
                </button>
              </Tooltip>
              <Tooltip content="Another tooltip example">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Hover me too
                </button>
              </Tooltip>
            </div>
          </section>

          {/* Custom Styled Tooltip */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Custom Styled Tooltip
            </h2>
            <Tooltip
              content="Custom styled tooltip with Tailwind classes"
              className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg"
            >
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                Custom Tooltip
              </button>
            </Tooltip>
          </section>

          {/* Tooltip with Different Placements */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tooltip Placements
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Tooltip content="Top placement" placement="top">
                <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                  Top
                </button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom">
                <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                  Bottom
                </button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left">
                <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                  Left
                </button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right">
                <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                  Right
                </button>
              </Tooltip>
            </div>
          </section>

          {/* Interactive Tooltip */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Interactive Tooltip
            </h2>
            <Tooltip
              content={
                <div className="p-2">
                  <p className="font-semibold mb-1">Interactive Content</p>
                  <p className="text-sm">You can interact with this tooltip!</p>
                </div>
              }
              disableInteractive={false}
              className="bg-gray-900 text-white rounded-lg shadow-lg"
            >
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                Interactive Tooltip
              </button>
            </Tooltip>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
