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
    name?: string
    cost?: number
    description?: string
    recommended?: boolean
    image?: string
    quantity?: number
    buyer?: string

}

export interface ItemBody {
    name?: string
    cost?: string
    description?: string
    recommended?: boolean
    image?: string
    quantity?: number
    buyer?: string
  
}


export interface Category extends SanityBody {
    _type: "category"
    title: string
}

export interface User extends SanityBody {
    _type: 'user'
    name: string
    email: string
    orders?: Items[]
    address?: string
    town?: string
}

export interface UserBody {
    name?: string
    email?: string
    orders?: Order[]
    id?: string
    address?: string
    town?: string
}


export interface Order extends SanityBody {
    name?: string
    cost?: string
    recommended?: boolean
    quantity?: number
    buyer?: string
}
export interface OrderBody  {
    name?: string
    cost?: string
    recommended?: boolean
    quantity?: number
    buyer?: string
}