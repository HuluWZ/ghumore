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
      <div className="App">
        {/* <Navbar/> */}
        <Header/>
        <br/>
        <br/>
        <br/>
        <Activity/>
        <br/>
        <br/>
        <br/>
        <Destination/>
        <br/>
        <br/>
        <br/>
        <Company/>
        <br/>
        <br/>
        <br/>
        <Experience/>
        <br/>
        <br/>
        <br/>
        <BaliExperience/>
        <br/>
        <br/>
        <br/>
        <Promotion/>
        <br/>
        <br/>
        <br/>
        <Testimonial/>
        <br/>
        <br/>
        <br/>
        <Poster/>
        {/* <Footer/> */}
      </div>
    );
  }
  
  export default LandingPage;
  