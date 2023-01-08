import { Category } from '../typings'

export const fetchCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getCategory`)

  const data = await res.json()
  const category: Category[] = data.category
  return category
}