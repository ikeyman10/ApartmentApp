import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import Image1 from '../../assets/img/brand/20190323-0008.jpg'
import Image2 from '../../assets/img/brand/20190323-0014.jpg'
import Image3 from '../../assets/img/brand/20190323-0016.jpg'


const items = [
  {
    src: Image1,
    altText: 'Slide 1',
    caption: 'on your mat',
    header: 'CONNECT WITH US',
    key: '1'
  },
  {
    src:Image2, 
    altText: 'Slide 2',
    caption: 'at home + traveling',
    header: 'DIVE DEEP WITH US',
    key: '2'
  },
  {
    src: Image3,
    altText: 'Slide 3',
    caption: 'in your safe space',
    header: 'EXPAND YOUR MIND',
    key: '3'
  }
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;