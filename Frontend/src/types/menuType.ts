export interface MenuItem {
    _id: string // Changed from 'id: number' to match the store expectations
    name: string
    price: number
    discount: string
    description: string
    image: string
    savings: number
  }
  
  export interface CartItem extends MenuItem {
    quantity: number
  }
  
  