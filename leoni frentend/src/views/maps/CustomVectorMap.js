// react plugin for creating vector maps
import React from 'react';
import { VectorMap } from 'react-jvectormap';
import './VectorMap.css';


import ComponentCard from '../../components/ComponentCard';

const mapData = {
  TN: 500, 
  DE: 800,
  CN: 0,
  US: 0,
  MX: 0,
  RS: 0,
  UA: 0,
  PL: 0,
  MA: 0,
  SK: 0,
  IN: 0,
  BR: 0,
  BG: 0,
  PT: 0,
  RO: 0,
  TH: 0,
  TR: 0,
  VN: 0
};
const CustomVectorMap = () => {
  return (
    <>
      
      <ComponentCard title="World Map">
        <VectorMap
          map="world_mill"
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: '100%',
            height: '375px',
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: '#d5e4e4',
              'fill-opacity': 0.9,
              stroke: '1',
              'stroke-width': 1,
              'stroke-opacity': 0.5,
            },
          }}
          series={{
            regions: [
              {
                values: mapData,
                scale: ['#1e88e5'],
              },
            ],
          }}
        />
      </ComponentCard>

      
    </>
  );
};

export default CustomVectorMap;
