import React from 'react';
import './Marker.css';

interface MarkerProps {
  lat: number;
  lng: number;
  color: any;
  id: string;
  onSelect: (id: string) => void;
}

const Marker: React.FC<MarkerProps> = ({ id, color, onSelect }) => {
  return (
    <div>
      <div className='pin bounce' style={{ backgroundColor: color, cursor: 'pointer' }} onClick={() => onSelect(id)} />
      <div className='pulse' />
    </div>
  );
};

export default Marker;
