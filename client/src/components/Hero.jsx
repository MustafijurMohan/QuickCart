
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import men from '../assets/banner_mens.png'
import women from '../assets/banner_women.png'
import kid from '../assets/banner_kids.png'

import { Link } from "react-router";

const Hero = () => {

const slides = [
  {
    id: 1,
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
    image: men
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Trendy & Stylish",
    image: women
  },
  {
    id: 3,
    title: "Exclusive Offers",
    subtitle: "Limited Time Only",
    image: kid
  },
  {
    id: 4,
    title: "Accessories & More",
    subtitle: "Complete your look",
    image: men
  },
  {
    id: 5,
    title: "Winter Warmth",
    subtitle: "Cozy & stylish",
    image: kid
  }
];


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true, // Set to true if you want navigation arrows
  fade: true, // Optional: adds fade transition effect
  pauseOnHover: true
};


  return (
    <>
      <div className="relative w-full">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id}>
              <div
                className="h-60 w-full rounded bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="bg-opacity-50 text-black text-center ml-20 p-6 rounded-xl">
                  <h1 className="text-xl md:text-xl font-bold mb-1">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                  <Link to='/shop' className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default Hero

// h-[50vh] w-full