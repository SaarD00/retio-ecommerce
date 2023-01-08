import type {NextApiRequest, NextApiResponse} from "next"
import {groq } from "next-sanity"; 
import {sanityClient } from "../../sanity";
import { Stores as Store } from "../../typings";


const query = groq`
*[_type == "stores" && slug.current == $slug[0]] {
    ...,
    types[]->{
      ...,
    },
    category[]->{
    ...,
  }
  
  } 
`

type Data = {
   stores: Store
}




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
    ) {
     const slug = req.query.slug as string;


   const stores: Store = await sanityClient.fetch(query, {slug})
   res.status(200).json({ stores})
 }
 