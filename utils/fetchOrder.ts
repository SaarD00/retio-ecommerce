import { Order, Stores as Store } from '../typings'

export const fetchOrders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getOrder`)

  const data = await res.json()
  const orders: Order[] = data.orders
  return orders
}