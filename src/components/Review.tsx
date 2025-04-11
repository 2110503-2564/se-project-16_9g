import Rating from '@mui/material/Rating';

export default function Review({rating, comment} : {rating:number, comment:string}) {
    return (
        <div className='relative w-[350px] h-auto px-3 py-8 bg-white rounded-lg 
        shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)]  m-5 flex flex-col items-center text-black'>
            <div className='px-3 pb-5 text-md my-5'>
                {comment}
            </div>
            <div className='absolute bottom-0 pb-2 '>
                <Rating name="size-large" defaultValue={rating} readOnly size="large" />
            </div>
        </div>
    );
}