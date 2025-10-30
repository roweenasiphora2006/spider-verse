import { useState } from 'react';
import { useMultiverseStore } from '../store/multiverseStore';
import { Link, Scissors, Radio } from 'lucide-react';

export const ControlPanel = () => {
  const { nodes, linkUniverses, splitUniverse, reportChain } = useMultiverseStore();
  const [selectedNodeA, setSelectedNodeA] = useState('');
  const [selectedNodeB, setSelectedNodeB] = useState('');
  const [selectedNode, setSelectedNode] = useState('');

  const nodeArray = Array.from(nodes.values());

  const handleLink = () => {
    if (selectedNodeA && selectedNodeB && selectedNodeA !== selectedNodeB) {
      linkUniverses(selectedNodeA, selectedNodeB);
    }
  };

  const handleSplit = () => {
    if (selectedNode) {
      splitUniverse(selectedNode);
    }
  };

  const handleReport = () => {
    if (selectedNode) {
      reportChain(selectedNode);
    }
  };

  return (
    <div className="w-96 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 overflow-y-auto border-l-4 border-purple-500 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" style={{ fontFamily: 'Bangers, cursive' }}>
          🕸 MULTIVERSE OPERATIONS
        </h2>
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 p-4 rounded-lg border-2 border-blue-500 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Link className="text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-blue-400">LINK</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">Connect two universes together</p>

          <div className="space-y-2">
            <select
              value={selectedNodeA}
              onChange={(e) => setSelectedNodeA(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border-2 border-blue-400 focus:border-blue-300 focus:outline-none"
            >
              <option value="">Select Universe A</option>
              {nodeArray.map(node => (
                <option key={node.id} value={node.id}>
                  {node.spiderPerson.name}
                </option>
              ))}
            </select>

            <select
              value={selectedNodeB}
              onChange={(e) => setSelectedNodeB(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border-2 border-blue-400 focus:border-blue-300 focus:outline-none"
            >
              <option value="">Select Universe B</option>
              {nodeArray.map(node => (
                <option key={node.id} value={node.id}>
                  {node.spiderPerson.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleLink}
              disabled={!selectedNodeA || !selectedNodeB || selectedNodeA === selectedNodeB}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-blue-300"
            >
              LINK UNIVERSES
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border-2 border-red-500 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Scissors className="text-red-400" size={24} />
            <h3 className="text-xl font-bold text-red-400">SPLIT</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">Create a dimensional rupture</p>

          <div className="space-y-2">
            <select
              value={selectedNode}
              onChange={(e) => setSelectedNode(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border-2 border-red-400 focus:border-red-300 focus:outline-none"
            >
              <option value="">Select Node to Split</option>
              {nodeArray.filter(node => node.next).map(node => (
                <option key={node.id} value={node.id}>
                  {node.spiderPerson.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSplit}
              disabled={!selectedNode}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-red-300"
            >
              RUPTURE TIMELINE
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border-2 border-purple-500 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="text-purple-400" size={24} />
            <h3 className="text-xl font-bold text-purple-400">REPORT</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">Trace web integrity</p>

          <div className="space-y-2">
            <select
              value={selectedNode}
              onChange={(e) => setSelectedNode(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded border-2 border-purple-400 focus:border-purple-300 focus:outline-none"
            >
              <option value="">Select Starting Node</option>
              {nodeArray.map(node => (
                <option key={node.id} value={node.id}>
                  {node.spiderPerson.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleReport}
              disabled={!selectedNode}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-300"
            >
              TRACE WEB
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg border-2 border-gray-600 shadow-lg backdrop-blur-sm">
          <h3 className="text-lg font-bold text-gray-300 mb-3">LEGEND</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-gray-300">Miles Morales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-500"></div>
              <span className="text-gray-300">Gwen Stacy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-gray-300">Peter Parker</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-gray-300">Spider-Punk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              <span className="text-gray-300">Spider-Noir</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
