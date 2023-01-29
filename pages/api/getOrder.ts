import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Order, Stores as Store } from "../../typings";


const query = groq`
*[_type == "order"] {
  ...,
}  | order(_createdAt asc)
`

type Data = {
   orders: Order[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const orders: Order[] = await sanityClient.fetch(query)
   res.status(200).json({ orders})
 }
 