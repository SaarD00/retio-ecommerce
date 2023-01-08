import { Stores as Store } from '../typings'



export const fetchStoreBySlug = async () => {
  const res = await fetch(`http://localhost:3000/api/getStoresBySlug?slug=jinaam-stores`)

  const data = await res.json()
  const stores = data.stores
  console.log(data)
  return stores
}