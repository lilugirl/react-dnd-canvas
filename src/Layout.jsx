import { useState } from "react";
import { data } from "./data";
import "./Layout.css";

const Layout = () => {
  const [items, setItems] = useState([]);
  const [source, setSource] = useState(null);
  const [target, setTarget] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  console.log('items',items)

  const onDragOver = (e) => {
    e.preventDefault();
    source.x=e.clientX-source.w/2 - 150;
    source.y=e.clientY-source.h/2 - 0;
    setTarget(source);
  };

  const onDragLeave = (e) => {
    setTarget(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setItems([...items, target]);
    setCurrentIndex(items.length);
  };

  const onDragStart = (comp) => (e) => {
    e.target.style.opacity = 0.1;
    setSource(JSON.parse(JSON.stringify(comp)));
  };

  const onDragEnd = (e) => {
    e.target.style.opacity = 1;
    setSource(null);
    setTarget(null);
  };

  const onMouseDown = (index)=>(e) => {
    setCurrentIndex(index);
  
    const onMouseMove=(e)=>{
      let newItems=[...items];
      newItems[index].w=e.target.offsetWidth;
      newItems[index].h=e.target.offsetHeight;
      newItems[index].x=e.clientX-newItems[index].w/2 - 150;
      newItems[index].y=e.clientY-newItems[index].h/2;
      setItems(newItems);
    }

    const onMouseUp=(e)=>{
      e.target.removeEventListener('mousemove',onMouseMove);
      e.target.removeEventListener('mouseup',onMouseUp);
    }

    e.target.addEventListener('mousemove',onMouseMove);
    e.target.addEventListener('mouseup',onMouseUp);
  }

  return (
    <div className="layout">
      <div className="left">
        {data.map((item, index) => (
          <div
            key={index}
            className="box"
            id={item.id}
            draggable
            onDragStart={onDragStart(item)}
            onDragEnd={onDragEnd}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div
        className="main"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {currentIndex} 
        {items.map((item, index) => (
          <div key={index} className={`box comp ${index===currentIndex?'selected':''}`} style={{left:item.x+'px',top:item.y+'px'}} onMouseDown={onMouseDown(index)}>
            {item.label}
          </div>
        ))}
      </div>
      <div className="right">right</div>
    </div>
  );
};

export default Layout;
