import React, { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, useTrail, Environment } from "@react-three/drei"

const Animal = () => {

  const { scene, nodes } = useGLTF("/model/robot.glb")
  useThree(({camera,scene,gl}) =>{
    camera.position.set(0, 0, 4)
  })

  const headRef = useRef(null)
  const leftArmRef = useRef(null)
  const rightArmRef = useRef(null)

  
  useEffect(() => {
    headRef.current = nodes.Head
    leftArmRef.current = nodes.forearm
    rightArmRef.current = nodes.forearm_1
  }, [nodes])

  useFrame(({ mouse, clock }) => {

  const time = clock.getElapsedTime()

  
  if (headRef.current) {
    headRef.current.rotation.y += 
      (mouse.x * 0.6 - headRef.current.rotation.y) * 0.1

    headRef.current.rotation.x += 
      (-mouse.y * 0.3 - headRef.current.rotation.x) * 0.1
  }

  

  const subtleSide = mouse.x * 0.15
  const subtleLift = -mouse.y * 0.1

  if (leftArmRef.current) {

    
    leftArmRef.current.rotation.y += 
      (subtleSide - leftArmRef.current.rotation.y) * 0.05

    leftArmRef.current.rotation.z += 
      (subtleLift - leftArmRef.current.rotation.z) * 0.05

    leftArmRef.current.rotation.x =
      Math.sin(time * 1.5) * 0.05
  }

  if (rightArmRef.current) {

    rightArmRef.current.rotation.y += 
      (-subtleSide - rightArmRef.current.rotation.y) * 0.05

    rightArmRef.current.rotation.z += 
      (-subtleLift - rightArmRef.current.rotation.z) * 0.05

    rightArmRef.current.rotation.x =
      Math.sin(time * 1.5 + Math.PI) * 0.05
  }
})


scene.traverse((child) => {
  if (child.isMesh && child.material) {

    child.material.map = null

    child.material.color.set("#0a0a0a")
    child.material.metalness = 1
    child.material.roughness = 0.15

   
    child.material.envMapIntensity = 1.5

    child.material.needsUpdate = true
  }
})

// useEffect(() => {
//   scene.traverse((child) => {
//     if (child.isMesh && child.material) {
//       child.material.envMapIntensity = 1.5
//       child.material.needsUpdate = true
//     }
//   })
// }, [scene])


  return (
    <>
     {/* <group ref={modelRef}> */}
      <primitive object={scene} position={[0, -1.7, 0]} scale={1.1} />
      {/* </group> */}
      <ambientLight intensity={0.6} />
      {/* <directionalLight position={[7, 3, 4]} intensity={8} /> */}
      <directionalLight position={[-5, 3, -5]} intensity={1} />

      <OrbitControls enableZoom={false} />
      <Environment preset="studio" intensity={1.5}/>
    </>
  )
}

export default Animal