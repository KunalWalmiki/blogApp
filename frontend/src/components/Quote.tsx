

const Quote = () => {
  return (
    <div className='hidden md:flex h-screen bg-slate-200 justify-center items-center flex-col'>
        <div className='flex items-start flex-col max-w-lg'>
        <p
        className='text-3xl  font-bold '
        >" The customer service I received was exceptional. The support 
            team went above and beyond to address my concerns."
         </p>
         <p
         className='text-xl mt-4 font-medium'
         >Jules Winnfield</p>
         <p
         className='text-slate-600'
         >CEO, Acme Inc</p>
        </div>
        
    </div>
  )
}

export default Quote
