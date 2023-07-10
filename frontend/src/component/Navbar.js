import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onGumoReIndiaFinal1Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='iMAGE']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onFrameContainer2Click = useCallback(() => {
    navigate("/homeexperiences-dropdown30-may");
  }, [navigate]);

  const onFrameContainer3Click = useCallback(() => {
    navigate("/homedestination-dropdown30-may");
  }, [navigate]);

  const onFrameContainer4Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='titleContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onFrameContainer5Click = useCallback(() => {
    navigate("/homeabout-us30may");
  }, [navigate]);

  const onFrameContainer6Click = useCallback(() => {
    navigate("/homecontact-us3-jun");
  }, [navigate]);

  const onSignUpBtnClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onLoginBtnClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onCartBtnClick = useCallback(() => {
    navigate("/ghumore-detailed-product-page-checkout-04-jun");
  }, [navigate]);

  return (
    <div className="bg-gradient-to-r from-white via-white to-white w-full text-left text-base text-black-200 font-helvetica">
      <div className="bg-ghumore-yellowish w-full overflow-hidden flex flex-row py-2 px-4 box-border items-center justify-center">
        <div className="text-xl font-bold">{`Book tours, attractions & things to do with GHUMORE`}</div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg h-[100px] text-darkslategray-200 sm:gap-12">
        <img
          className="absolute top-[40px] left-[68.7px] w-[76px] h-[91px] overflow-hidden cursor-pointer"
          alt=""
          src="/gumo-re-indiafinal-11.svg"
          onClick={onGumoReIndiaFinal1Click}
        />
        <div className="py-2 px-4 sm:py-0 sm:px-2.5">
          <b className="text-center">Home</b>
          <div className="bg-ghumore-orange w-20 h-1 mx-auto mt-1" />
        </div>
        <div className="py-2 px-4 sm:py-0 sm:px-2.5">
          <div className="text-center">Experiences</div>
        </div>
        <div className="py-2 px-4 sm:py-0 sm:px-2.5">
          <div className="text-center">Destination</div>
        </div>
        <div className="py-2 px-4 sm:py-0 sm:px-2.5">
          <div className="text-center">Testimonies</div>
        </div>
        <div className="py-2 px-4 sm:py-0 sm:px-2.5">
          <div className="text-center">About us</div>
        </div>
        <div className="py-2 px-4 sm:py-0 sm:px-2.5">
          <div className="text-center">Contact us</div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-2 sm:mt-0">
          {user && user.fullName ? (
            <>
            <button 
            onClick={()=>{
              localStorage.removeItem("token");
              navigate("/login")
          }}
            className="py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-button-stroke">
            <img
              className="w-5 h-5 overflow-hidden"
              alt=""
              src="/sign-in1.svg"
            />
            <div className="text-base font-semibold font-lato text-white">
              Log Out
            </div>
          </button>
          <button 
            onClick={()=>{
              navigate("/profile")
          }}
            className="py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-button-stroke">
            <img
              className="w-5 h-5 overflow-hidden"
              alt=""
              src="/sign-in1.svg"
            />
            <div className="text-base font-semibold font-lato text-white">
              Profile
            </div>
          </button>
            </>
          
          ) : (
            <>
              <button 
              onClick={onSignUpBtnClick}
              className="py-2 px-4 bg-button-stroke rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-darkslateblue-100">
                <img
                  className="w-5 h-5 overflow-hidden"
                  alt=""
                  src="/sign-in.svg"
                />
                <div className="text-base font-semibold font-lato text-darkslateblue-200">
                  Sign up
                </div>
              </button>
              <button 
              className="py-2 px-4 bg-darkslateblue-100 rounded-md shadow-md flex items-center justify-center gap-2 border border-solid border-button-stroke"
              onClick={onLoginBtnClick}
              >
                <img
                  className="w-5 h-5 overflow-hidden"
                  alt=""
                  src="/sign-in1.svg"
                />
                <div className="text-base font-semibold font-lato text-white">
                  Login
                </div>
              </button>
            </>
          )}

          <button className="py-2 px-4 bg-button-stroke rounded-md shadow-md flex items-center justify-center gap-2">
            <img className="w-5 h-5 overflow-hidden" alt="" src="/cart.svg" />
            <div className="text-base font-semibold font-lato text-darkslateblue-100">
              Cart
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
