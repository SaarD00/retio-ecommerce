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
    items: Items[]
}

export interface Types extends SanityBody {
    _type: "types"
    title: string
}
export interface Items extends SanityBody {
    _type: "items"
    name: string
    cost: number
    description: string
    recommended: boolean
    image: string
    quantity: number
}


export interface Category extends SanityBody {
    _type: "category"
    title: string
}
