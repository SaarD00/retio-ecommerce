import { Types } from '../typings'

export const fetchTypes = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getTypes`)

  const data = await res.json()
  const types: Types[] = data.types
  return types
}