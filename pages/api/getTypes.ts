import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Types  } from "../../typings";


const query = groq`
*[_type == "types"] {
  ...,
} 
`

type Data = {
   types: Types[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const types: Types[] = await sanityClient.fetch(query)
   res.status(200).json({ types})
 }
 