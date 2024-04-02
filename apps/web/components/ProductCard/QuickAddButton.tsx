"use client"

import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { addCartItem } from "app/actions/cart.actions"
import { Spinner } from "components/Spinner/Spinner"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"
import { Combination } from "utils/productOptionsUtils"

interface QuickAddButtonProps {
  combination: Combination | undefined
  label?: string
  className?: string
}

export default function QuickAddButton({ combination, label, className }: QuickAddButtonProps) {
  const [state, formAction] = useFormState(addCartItem, { ok: false })
  const openCart = useCartStore((s) => s.openCart)

  const actionWithParams = formAction.bind(null, combination?.id)

  useEffect(() => {
    state.ok && openCart()
  }, [openCart, state])

  if (!combination) return null

  return (
    <form action={actionWithParams}>
      <Submit className={className}>
        <span className="truncate text-nowrap">{label || combination.title}</span>
      </Submit>
    </form>
  )
}

function Submit({ children, className }) {
  const { pending } = useFormStatus()

  return (
    <button
      onClick={(e) => pending && e.preventDefault()}
      disabled={pending}
      className={cn(
        "relative flex min-h-[30px] w-[70px] cursor-pointer justify-center border border-black bg-white p-1.5 text-[11px] uppercase transition-colors hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:hover:text-black",
        className
      )}
    >
      {pending ? <Spinner className="size-4" /> : children}
    </button>
  )
}
