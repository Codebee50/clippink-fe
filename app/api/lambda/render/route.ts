import {getFunctions, renderMediaOnLambda, getRenderProgress} from '@remotion/lambda/client';
import { NextResponse } from 'next/server';
import { appConfig } from '@/constants';


export async function POST(req: Request){
    const body = await req.json()
    const {video, width, height} = body

    const functions = await getFunctions({
        region: "us-east-1",
        compatibleOnly: true
    })

    const functionName = functions[0].functionName
    const serveUrl = "https://remotionlambda-useast1-h2ias1sgku.s3.us-east-1.amazonaws.com/sites/my-video/index.html"

    const result = await renderMediaOnLambda({
        region: "us-east-1",
        functionName,
        serveUrl,
        composition: "RemotionVideo",
        codec: "h264",
        inputProps: {
            video: video
        },
        downloadBehavior: {
            type: "play-in-browser",
        },
        framesPerLambda: 30,
        forceWidth: width,
        forceHeight: height,
        overwrite: true,
        outName: `${appConfig.APP_SHORT_NAME}-${video.id}-out.mp4`
        
    })

    return NextResponse.json(result, {
        status: 200
    })
}

