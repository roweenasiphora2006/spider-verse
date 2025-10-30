import { useMultiverseStore } from '../store/multiverseStore';
import { SpiderNode } from './SpiderNode';
import { WebConnection } from './WebConnection';
import { CosmicBackground } from './CosmicBackground';

export const MultiverseCanvas = () => {
  const { nodes, getNodePosition, activeAnimation } = useMultiverseStore();

  const nodeArray = Array.from(nodes.values());

  return (
    <div className="flex-1 relative overflow-hidden">
      <CosmicBackground />

      <div className="relative z-10 w-full h-full">
        {nodeArray.map((node) => {
          if (node.next) {
            const fromPos = getNodePosition(node.id);
            const toPos = getNodePosition(node.next);
            const isAnimating = activeAnimation?.includes(node.id) || activeAnimation?.includes(node.next);

            return (
              <WebConnection
                key={`web-${node.id}-${node.next}`}
                from={fromPos}
                to={toPos}
                color={node.spiderPerson.color}
                isAnimating={isAnimating}
              />
            );
          }
          return null;
        })}

        {nodeArray.map((node) => {
          const position = getNodePosition(node.id);
          const isAnimating = activeAnimation?.includes(node.id) || false;

          return (
            <SpiderNode
              key={node.id}
              node={node}
              position={position}
              isAnimating={isAnimating}
            />
          );
        })}

        {activeAnimation?.startsWith('split-') && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
          </div>
        )}

        {activeAnimation?.startsWith('report-') && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-purple-500/20 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
