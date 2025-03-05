import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer} from "react-konva";
import Rectangle from './Props/Rectangle';

const Drawpage = () => {
  const [rect, setRect] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  });

  const rectRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (transformerRef.current && rectRef.current) {
      transformerRef.current.nodes([rectRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [rectRef]); // Fix: Re-run effect when ref updates

  const handleDragMove = (e) => {
    setRect((prev) => ({ ...prev, x: e.target.x(), y: e.target.y() }));
  };

  const handleTransform = () => {
    const node = rectRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    setRect({
      x: node.x(),
      y: node.y(),
      width: Math.max(50, node.width() * scaleX),
      height: Math.max(50, node.height() * scaleY),
    });

    node.scaleX(1);
    node.scaleY(1);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      let dx = 0, dy = 0;
      if (event.key === "ArrowUp") dy = -5;
      if (event.key === "ArrowDown") dy = 5;
      if (event.key === "ArrowLeft") dx = -5;
      if (event.key === "ArrowRight") dx = 5;

      setRect((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full h-full border-2 border-blue-400">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rectangle/>
        </Layer>
      </Stage>
    </div>
  );
};

export default Drawpage;
