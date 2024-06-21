import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

interface DesignPreviewProps {
  itemImage: string;
  designImage: string;
}

const DesignPreview: React.FC<DesignPreviewProps> = ({ itemImage, designImage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 300,
        height: 400,
        backgroundColor: 'transparent' // Ensure canvas itself is transparent
      });

      // Load the t-shirt image (with transparent background)
      fabric.Image.fromURL(itemImage, (img) => {
        img.scaleToWidth(canvas.width as number);
        img.scaleToHeight(canvas.height as number);
        canvas.add(img);
        img.set({ selectable: false }); // Make sure the t-shirt image is not selectable

        // Load the design image with transparent background and add it to the canvas
        fabric.Image.fromURL(designImage, (designImg) => {
          designImg.scaleToWidth(150); // Adjust the size of the design
          designImg.set({ top: 100, left: 75 }); // Position the design on the t-shirt
          canvas.add(designImg);
          canvas.renderAll();
        });
      });

      // Cleanup function to dispose of the canvas
      return () => {
        canvas.dispose();
      };
    }
  }, [itemImage, designImage]);

  return (
    <div className="relative w-72 h-96">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default DesignPreview;
