import React, { useState } from 'react';
import './App.css';

const PHOTO_URL =
  'https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg';

const App = () => {
  // The content of the target box
  const [content, setContent] = useState<string>('Drop Something Here');

  // This function will be triggered when you start dragging
  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: string
  ) => {
    event.dataTransfer.setData('text', data);
    // data에다가 'text'라는 이름으로 data 값 저장?
    console.log(data);
    console.log('dragStartHandler');
  };

  // This function will be triggered when dropping
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    console.log(data);
    setContent(data);
    console.log('dropHandler');
  };

  // This makes the third box become droppable
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('allowDrop');
  };

  return (
    <div className='container'>
      <div
        className='box1'
        onDragStart={(event) => dragStartHandler(event, PHOTO_URL)}
        draggable={true}
      >
        <img src={PHOTO_URL} alt='Cute Dog' />
      </div>

      <div
        className='box2'
        onDragStart={(event) => dragStartHandler(event, 'Kindacode.com')}
        draggable={true}
      >
        <h2>Kindacode.com</h2>
      </div>

      <div className='box3' onDragOver={allowDrop} onDrop={dropHandler}>
        {content.endsWith('.jpeg') ? <img src={content} /> : <h2>{content}</h2>}
      </div>
    </div>
  );
};

export default App;
