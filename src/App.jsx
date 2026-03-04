import { useState } from 'react'
import { Suspense } from "react";
import './App.css'
import { Canvas } from '@react-three/fiber'
import Animal from './components/Animal'

function App() {
  return (
    <>
    <Canvas style={{ height: "100vh" }}
    //  camera={{ position: [0, 0, 6], fov: 60 }}
     camera={{ position: [0, 0, 10], fov: 60 }}>
       <Suspense fallback={null}>
        <Animal/>
       </Suspense>
      
    </Canvas>
    </>
  )
}

export default App
