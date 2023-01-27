import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Items, Stores as Store } from "../../typings";


const query = groq`
*[_type == "items"] {
  ...,
}  | order(_createdAt asc)
`

type Data = {
   items: Items[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const items: Items[] = await sanityClient.fetch(query)
   res.status(200).json({ items})
 }
 