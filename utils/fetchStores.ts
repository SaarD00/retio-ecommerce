import { Stores as Store } from '../typings'

export const fetchStores = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getStores`)

  const data = await res.json()
  const stores: Store[] = data.stores
  return stores
}