import Reveal from '../animation/Reveal'
import BestSeller from '../components/BestSeller'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import NewsletterBox from '../components/NewsletterBox'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <div>
      <Reveal><Hero /></Reveal>
      <Reveal><LatestCollection /></Reveal>
      <Reveal><BestSeller/></Reveal>
      <Reveal><OurPolicy /></Reveal>
      <Reveal><NewsletterBox /></Reveal>
    
    </div>
  )
}

export default Home