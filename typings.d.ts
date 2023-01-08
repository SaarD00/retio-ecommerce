interface SanityBody {
    _createdAt: string
    _id: string
    _rev: string
    _updatedAt: string
}


export interface Stores extends SanityBody {
    _type: "stores"
    name: string
    rating: number
    address: string
    discount: number
    slug: {
        current: string;
      };
    image: string
    types: Types[]
    category: Category[]
}

export interface Types extends SanityBody {
    _type: "types"
    title: string
}


export interface Category extends SanityBody {
    _type: "category"
    title: string
}
