import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const ResizableRectangle = () => {
  const [rect, setRect] = useState({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  });

  const [selected, setSelected] = useState(false);
  const rectRef = useRef(null);
  const transformerRef = useRef(null);

  useEffect(() => {
    if (selected && transformerRef.current && rectRef.current) {
      transformerRef.current.nodes([rectRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selected]);

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

  const handleStageClick = (e) => {
    // Deselect only if clicking on the stage (background)
    if (e.target === e.target.getStage()) {
      setSelected(false);
    }
  };

  return (
    <div className="w-full h-screen border-2 border-blue-400">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleStageClick} // Detect clicks on empty space
      >
        <Layer>
          <Rect
            ref={rectRef}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            fill="blue"
            draggable
            onClick={() => setSelected(true)} // Select on click
            onDragMove={handleDragMove}
            onTransformEnd={handleTransform}
          />
          {selected && <Transformer ref={transformerRef} />} {/* Show only if selected */}
        </Layer>
      </Stage>
    </div>
  );
};

export default ResizableRectangle;
