"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { UserWaitlistData } from "@/lib/types/waitlist"
import { addToWaitLIst, getFireStoreColumn } from "@/lib/utils/waitlist"
import useStyledToast from "@/hooks/useStyledToast"

type FormState = "idle" | "submitting" | "success" | "error"

export function WaitlistForm({ onSuccess }: { onSuccess?: (userData: UserWaitlistData) => void }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [formState, setFormState] = useState<FormState>("idle")
    const toast = useStyledToast()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!name.trim() || !email.trim()) return

        setFormState("submitting")

        const userData: UserWaitlistData = {
            email,
            name
        }
        const result = await addToWaitLIst(userData)

        if (result?.success) {
            setFormState("success")
            if (onSuccess) {
                onSuccess(userData)
            }
        } else {
            setFormState("error")
            toast.error(result?.error || "An error occurred, please try again")
        }
    }






    if (formState === "success") {
        return (
            <div className="rounded-xl border  border-greys2/10 bg-greys5 p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-senary/20 bg-senary/10">
                    <Check className="h-5 w-5 text-senary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {"You're on the list"}
                </h3>
                <p className="text-sm text-greys4">
                    {"We'll notify you at "}
                    <span className="text-greys2">{email}</span>
                    {" when we launch."}
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-xl border border-greys2/10 bg-greys3 p-8">
            <div className="flex flex-col gap-5">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-white"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={formState === "submitting"}
                        className="h-11 w-full rounded-lg border border-greys2/10 bg-denary px-4 text-sm text-foreground placeholder:text-greys4 focus:border-green focus:outline-none disabled:opacity-50"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-white"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={formState === "submitting"}
                        className="h-11 w-full rounded-lg border border-greys2/10 bg-denary px-4 text-sm text-foreground placeholder:text-greys4 focus:border-green focus:outline-none disabled:opacity-50"
                    />
                </div>

                <button
                    type="submit"
                    disabled={formState === "submitting" || !name.trim() || !email.trim()}
                    className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-senary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {formState === "submitting" ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Joining...
                        </>
                    ) : (
                        <>
                            Join the Waitlist
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </div>

            <p className="mt-4 text-center text-xs text-greys4">
                No spam, ever. We only email when it matters.
            </p>
        </form>
    )
}
