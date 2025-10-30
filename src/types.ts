export interface SpiderPerson {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  letter: string;
}

export interface LinkedListNode {
  id: string;
  spiderPerson: SpiderPerson;
  next: string | null;
}

export interface Universe {
  id: string;
  head: string | null;
  nodes: Map<string, LinkedListNode>;
}

export interface ActionLogEntry {
  id: string;
  message: string;
  color: string;
  timestamp: number;
}
