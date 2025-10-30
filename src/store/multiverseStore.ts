import { create } from 'zustand';
import { LinkedListNode, ActionLogEntry, SpiderPerson } from '../types';
import { SPIDER_PEOPLE } from '../data/spiderPeople';

interface MultiverseState {
  nodes: Map<string, LinkedListNode>;
  universeHeads: Map<string, string>;
  actionLog: ActionLogEntry[];
  activeAnimation: string | null;

  initializeUniverse: () => void;
  linkUniverses: (nodeAId: string, nodeBId: string) => void;
  splitUniverse: (nodeId: string) => void;
  reportChain: (nodeId: string) => void;
  addActionLog: (message: string, color: string) => void;
  setActiveAnimation: (animation: string | null) => void;
  getNodePosition: (nodeId: string) => { x: number; y: number };
}

export const useMultiverseStore = create<MultiverseState>((set, get) => ({
  nodes: new Map(),
  universeHeads: new Map(),
  actionLog: [],
  activeAnimation: null,

  initializeUniverse: () => {
    const initialNodes = new Map<string, LinkedListNode>();
    const universeHeads = new Map<string, string>();

    SPIDER_PEOPLE.forEach((spider, index) => {
      const nodeId = `node-${spider.id}`;
      const nextId = index < SPIDER_PEOPLE.length - 1 ? `node-${SPIDER_PEOPLE[index + 1].id}` : null;

      initialNodes.set(nodeId, {
        id: nodeId,
        spiderPerson: spider,
        next: nextId,
      });

      if (index === 0) {
        universeHeads.set('universe-main', nodeId);
      }
    });

    set({
      nodes: initialNodes,
      universeHeads,
      actionLog: [{
        id: 'init',
        message: '🌌 The Multiverse has been initialized. All Spider-People are connected!',
        color: '#a78bfa',
        timestamp: Date.now(),
      }]
    });
  },

  linkUniverses: (nodeAId: string, nodeBId: string) => {
    const state = get();
    const nodes = new Map(state.nodes);

    const nodeA = nodes.get(nodeAId);
    const nodeB = nodes.get(nodeBId);

    if (!nodeA || !nodeB) return;

    let tailA = nodeA;
    while (tailA.next && nodes.get(tailA.next)) {
      tailA = nodes.get(tailA.next)!;
    }

    const updatedTail = { ...tailA, next: nodeBId };
    nodes.set(tailA.id, updatedTail);

    const message = `🕸 ${nodeA.spiderPerson.name} connected their web with ${nodeB.spiderPerson.name}'s universe!`;

    set({ nodes, activeAnimation: `link-${nodeAId}-${nodeBId}` });
    get().addActionLog(message, nodeA.spiderPerson.color);

    setTimeout(() => set({ activeAnimation: null }), 2000);
  },

  splitUniverse: (nodeId: string) => {
    const state = get();
    const nodes = new Map(state.nodes);
    const node = nodes.get(nodeId);

    if (!node || !node.next) return;

    const nextNodeId = node.next;
    const updatedNode = { ...node, next: null };
    nodes.set(nodeId, updatedNode);

    const universeHeads = new Map(state.universeHeads);
    const newUniverseId = `universe-${Date.now()}`;
    universeHeads.set(newUniverseId, nextNodeId);

    const message = `⚡ ${node.spiderPerson.name} ruptured their timeline! A new universe emerges from the split!`;

    set({ nodes, universeHeads, activeAnimation: `split-${nodeId}` });
    get().addActionLog(message, node.spiderPerson.color);

    setTimeout(() => set({ activeAnimation: null }), 2000);
  },

  reportChain: (nodeId: string) => {
    const state = get();
    const nodes = state.nodes;
    const startNode = nodes.get(nodeId);

    if (!startNode) return;

    const chain: string[] = [];
    let current: LinkedListNode | undefined = startNode;

    while (current) {
      chain.push(current.spiderPerson.name);
      current = current.next ? nodes.get(current.next) : undefined;
    }

    const message = `🌐 ${startNode.spiderPerson.name} traced their web through the multiverse: ${chain.join(' → ')}`;

    set({ activeAnimation: `report-${nodeId}` });
    get().addActionLog(message, startNode.spiderPerson.color);

    setTimeout(() => set({ activeAnimation: null }), 3000);
  },

  addActionLog: (message: string, color: string) => {
    set(state => ({
      actionLog: [
        {
          id: `log-${Date.now()}`,
          message,
          color,
          timestamp: Date.now(),
        },
        ...state.actionLog.slice(0, 9),
      ],
    }));
  },

  setActiveAnimation: (animation: string | null) => {
    set({ activeAnimation: animation });
  },

  getNodePosition: (nodeId: string) => {
    const state = get();
    const nodes = Array.from(state.nodes.values());
    const index = nodes.findIndex(n => n.id === nodeId);

    const baseX = 150;
    const baseY = 150;
    const spacing = 180;

    const row = Math.floor(index / 3);
    const col = index % 3;

    return {
      x: baseX + col * spacing,
      y: baseY + row * spacing,
    };
  },
}));
