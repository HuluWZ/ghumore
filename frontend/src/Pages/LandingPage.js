import Activity from '../Components/Activities';
import BaliExperience from '../Components/BaliExperience';
import Company from '../Components/Company';
import Destination from '../Components/Destination';
import Experience from '../Components/Experience';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Poster from '../Components/Poster';
import Promotion from '../Components/Promotion';
import Testimonial from '../Components/Testimonial';
import '../App.css';





function LandingPage() {
  return (
    <div className="App container flex flex-col justify-center overflow-x-hidden">
      {/* <Navbar/> */}
      <Header />

      <Activity />

      <Destination />

      <Company />

      <Experience />

      <BaliExperience />

      <Promotion />

      <Testimonial />

      <Poster />
      {/* <Footer/> */}
    </div>
  );
}

export default LandingPage;
