import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Categories from './Categories';

export default function Home() {

  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    // ... Add more categories
  ];
  
  return (
    <>
    hi
    <Categories/>
    </>

  )
}


