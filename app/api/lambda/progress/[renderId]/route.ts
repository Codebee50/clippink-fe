import { NextRequest, NextResponse } from "next/server"
import {getRenderProgress, getFunctions} from '@remotion/lambda/client';


export async function POST(req: NextRequest, { params }: { params: { renderId: string } }){
    const {renderId} = await params
    const {bucketName} = await req.json()

    const functions = await getFunctions({
        region: "us-east-1",
        compatibleOnly: true
    })

    if (!functions.length){
        return NextResponse.json({ error: "No functions found" }, { status: 500 })
    }

    const functionName = functions[0].functionName

    const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName,
        region: "us-east-1",
    })

    if (progress.done){
        return NextResponse.json({done: true, url: progress.outputFile, progress: progress.overallProgress, error: false}, { status: 200 })
    }

    if(progress.fatalErrorEncountered){
        return NextResponse.json({
            errors: progress.errors,
            done:false,
            error: true
        }, { status: 200 })
    }

    return NextResponse.json({
        done: false,
        progress: progress.overallProgress,
        error: false
    }, { status: 200 })
}