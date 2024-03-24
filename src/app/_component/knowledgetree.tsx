"use client"
import ReactFlow, {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Background,
    Controls,
    MiniMap,
    Connection,
    useReactFlow,
    updateEdge,
    Node,
    Edge,
    Position,
    MarkerType,
    ReactFlowInstance,
    useEdges,
  } from 'react-flow-renderer';
  
  function saveToBackend(nodes:any, edges:any) {
    const data = {
        nodes: nodes,
        edges: edges
    };

    // 실제로는 이 부분에서 백엔드 API를 호출하여 데이터를 저장해야 합니다.
    // 아래는 예시로 console에 데이터를 출력하는 부분입니다.
    console.log("Data to be saved to backend:", data);
}

  
  export default function Home() {
    const defaultNodes = [
        { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 0 } },
        { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
      ];
      
      const defaultEdges = [{ id: 'e1-2', source: '1', target: '2' }];
    saveToBackend(defaultNodes, defaultEdges);
    return (
      <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges}>
        <Background gap={8} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    );
  }
  