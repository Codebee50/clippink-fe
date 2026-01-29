"use client"

import React, { useEffect } from 'react'
import { useUserStore } from '@/hooks/useUser'

// this component is added to the root layout.ts file, it is used to fetch the user and set it in the userstore

const UserHeader = () => {
    const { fetchUser } = useUserStore()
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <></>
    )
}

export default UserHeader