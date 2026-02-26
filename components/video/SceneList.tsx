import { useVideoStore } from '@/lib/store/video'
import React, { useMemo } from 'react'
import SceneCard from './SceneCard'
import AddSceneButton from './AddSceneButton'

const SceneList = ({ mobile = false }: { mobile?: boolean }) => {
    const video = useVideoStore(state => state.video)
    const scenes = useMemo(() => video?.scenes.sort((a, b) => a.order_number - b.order_number), [video])
    return (
        <div className={`w-full h-full border-r border-r-greys1/20 bg-[#0C0C10] overflow-y-scroll p-4 pb-[100px] flex flex-col gap-4 cus-scrollbar shrink-0 `}>

            {
                scenes && scenes[0] && <AddSceneButton currentScene={null} prevSceneOrderNumber={null} nextSceneOrderNumber={scenes[0].order_number} />
            }

            {video && scenes && scenes.map((scene, index) => {
                const lastScene = scenes[index - 1]
                const nextScene = scenes[index + 1]
                return <div key={scene.id} className='flex flex-col gap-4'>
                    <SceneCard scene={scene} scene_index={index + 1} />

                    <AddSceneButton currentScene={scene} prevSceneOrderNumber={lastScene?.order_number || ((nextScene?.order_number) - 1000)} nextSceneOrderNumber={nextScene?.order_number} />
                </div>
            })}

        </div>
    )
}

export default SceneList