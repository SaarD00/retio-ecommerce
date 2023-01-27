import { Items, Stores as Store } from '../typings'

export const fetchItems = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getItems`)

  const data = await res.json()
  const items: Items[] = data.items
  return items
}