export interface ReservationItem {
    _id: string,
    resDate: string,
    resTime: string,
    user: string,
    restaurant: string,
    createdAt: string,
    __v: number
}

export interface ReviewItem {
    user: string,
    rating: number,
    comment: string,
    _id: string,
    createdAt: string 
}

export interface RestaurantItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    picture: string,
    tel: string,
    region: string,
    opentime: string, 
    closetime: string,
    reviews: ReviewItem[]; 
    __v: number;
    reservations: ReservationItem[];
    id: string;
}

export interface RestaurantJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: RestaurantItem[]
}

export interface ReservationJson {
    success: boolean,
    count: number,
    data: ReservationItem[]
}