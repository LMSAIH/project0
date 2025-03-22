import React, { useState } from 'react';
import styled from 'styled-components';

interface DraggableItem {
  id: number;
  content: string;
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
`;

const DragContainer = styled.div`
  width: 300px;
  min-height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
`;

const DraggableElement = styled.div`
  padding: 16px;
  margin: 8px 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: move;
  user-select: none;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DropZone = styled.div<{ isDragOver: boolean }>`
  min-height: 100px;
  background-color: ${props => props.isDragOver ? '#e3f2fd' : '#fff'};
  border: 2px dashed ${props => props.isDragOver ? '#2196f3' : '#ddd'};
  border-radius: 4px;
  margin: 16px 0;
  padding: 16px;
  transition: all 0.2s ease;
`;

const MainPage: React.FC = () => {
  const [items, setItems] = useState<DraggableItem[]>([
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
  ]);
  const [droppedItems, setDroppedItems] = useState<DraggableItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent, item: DraggableItem) => {
    e.dataTransfer.setData('text/plain', item.id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const id = parseInt(e.dataTransfer.getData('text/plain'));
    const draggedItem = items.find(item => item.id === id);
    
    if (draggedItem) {
      setItems(items.filter(item => item.id !== id));
      setDroppedItems([...droppedItems, draggedItem]);
    }
  };

  return (
    <Container>
      <DragContainer>
        <h2>Draggable Items</h2>
        {items.map(item => (
          <DraggableElement
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
          >
            {item.content}
          </DraggableElement>
        ))}
      </DragContainer>

      <DragContainer>
        <h2>Drop Zone</h2>
        <DropZone
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {droppedItems.length === 0 ? (
            <p>Drop items here</p>
          ) : (
            droppedItems.map(item => (
              <DraggableElement key={item.id}>
                {item.content}
              </DraggableElement>
            ))
          )}
        </DropZone>
      </DragContainer>
    </Container>
  );
};

export default MainPage;
