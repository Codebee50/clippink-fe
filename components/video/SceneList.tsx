import { useVideoStore } from '@/lib/store/video'
import React from 'react'
import SceneCard from './SceneCard'

const SceneList = ({mobile=false}: {mobile?: boolean}) => {
    const video = useVideoStore(state => state.video)
    return (
        <div className={`w-full h-full border-r border-r-greys1/20 bg-[#0C0C10] overflow-y-scroll p-4 flex flex-col gap-4 cus-scrollbar shrink-0 `}>
            {video && video.scenes.sort((a, b) => a.order_number - b.order_number).map(scene => <SceneCard key={scene.id} scene={scene} />)}
        </div>
    )
}

export default SceneList