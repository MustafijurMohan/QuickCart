

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <>
      {/* <div className="text-center">
        <p className='text-gray-800 text-2xl font-medium'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        <form onSubmit={onSubmitHandler} action="" className='w-full sm:w-1/2 flex items-center m-auto my-6 pl-3 border'>
          <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your email' />
          <button type="submit" className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>SUBSCRIBE</button>
        </form>
      </div> */}




          <div className="bg-gray-100 py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 mb-6">
                Get the latest updates on new arrivals, exclusive offers, and more.
              </p>
              <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row sm:w-1/2 m-auto items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>



    </>
  )
}

export default NewsletterBox