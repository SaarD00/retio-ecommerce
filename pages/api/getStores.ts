import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Stores as Store } from "../../typings";


const query = groq`
*[_type == "stores"] {
    ...,
    types[]->{
      ...,
    },
    category[]->{
    ...,
  }
  
  }  | order(_createdAt asc)
`

type Data = {
   stores: Store[]
}


export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
 ) {

   const stores: Store[] = await sanityClient.fetch(query)
   res.status(200).json({ stores})
 }
 