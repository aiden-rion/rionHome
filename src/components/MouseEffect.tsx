
import React, { useEffect, useState, useRef } from 'react';

const TRAIL_COUNT = 8;

export function MouseEffect() {

  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [clicked, setClicked] = useState(false);
  const [moving, setMoving] = useState(false);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const lastMousePos = useRef(position);
  const moveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setMoving(true);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        setMoving(false);
      }, 100);

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };



    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);




    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {



      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    trailRefs.current.forEach((trail, index) => {
      if (!trail) return;
      const delay = (TRAIL_COUNT - index) * 4;
      const mouseX = position.x - 10;
      const mouseY = position.y - 10;
      trail.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      trail.style.transition = `transform 0.1s ease ${delay}ms`;
      trail.style.opacity = `${(TRAIL_COUNT - index) / TRAIL_COUNT}`;
      trail.style.width = '20px';
      trail.style.height = '20px';
      trail.style.borderRadius = '50%';
      trail.style.position = 'fixed';
      trail.style.pointerEvents = 'none';
      trail.style.backgroundColor = 'rgba(70,130,180, 0.3)';
      trail.style.filter = 'blur(4px)';
      trail.style.zIndex = '9998';
    });
  }, [position]);

  return (
















    <>
      {[...Array(TRAIL_COUNT)].map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={el => (trailRefs.current[i] = el!)}
          style={{
            position: 'fixed',
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: `rgba(70,130,180, ${(TRAIL_COUNT - i) / TRAIL_COUNT / 2})`,
            pointerEvents: 'none',
            filter: 'blur(2px)',
            transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
            transition: `transform 0.1s ease ${(TRAIL_COUNT - i) * 5}ms, opacity 0.3s ease`,
            zIndex: 9998,
          }}
        />
      ))}
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: clicked ? 40 : 20,
          height: clicked ? 40 : 20,
          marginLeft: clicked ? -20 : -10,
          marginTop: clicked ? -20 : -10,
          borderRadius: '50%',
          backgroundColor: clicked ? 'rgba(255,99,71,0.9)' : 'rgba(70,130,180,0.9)',
          pointerEvents: 'none',
          filter: moving ? 'blur(4px)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, background-color 0.2s ease, filter 0.3s ease',
          zIndex: 9999,
          boxShadow: moving
            ? `0 0 8px 2px rgba(70,130,180,0.5)`
            : '0 0 5px 1px rgba(70,130,180,0.3)',
        }}
      />
    </>
  );
}
