import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Category } from "../../typings";


const query = groq`
*[_type == "category"] {
  ...,
}
`

type Data = {
    category: Category[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const category: Category[] = await sanityClient.fetch(query)
   res.status(200).json({ category})
 }
 