import React from "react";
import DrawerAppBar from "./Navbar/DrawerAppBar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
    return (
        <>
            <DrawerAppBar />

            <section className="bg-gray-100 text-start">
                <style>
                    {`
        .section-heading {
          font-size: 24px;
        }
        p {
          font-size: 16px;
        }
        `}
                </style>
                <div className="px-5 py-10 bg-white max-w-4xl mx-auto pt-10">
                    <h1 className="text-center font-sans md:text-4xl text-[30px] font-bold tracking-wide underline underline-offset-1 text-gray-900">
                        Privacy Policy
                    </h1>
                    <section className="grid gap-y-4">
                        <div>
                            <h1 className=" text-[20px] md:text-[25px] font-semibold mb-2">
                                1. Collection of Personal Information
                            </h1>
                            <p className="text-gray-700">
                                We collect personal information, such as your name, email address,
                                and phone number when you make a booking or create an account on our
                                travel and activity booking website. By providing us with this
                                information, you consent to its collection and use for the purpose of
                                facilitating your bookings and improving our services.
                            </p>
                            <p className="text-gray-700">
                                We may also collect non-personal information, such as your IP address
                                and browsing behavior, to analyze trends, administer the website, and
                                gather demographic information.
                            </p>
                        </div>
                        <div>
                            <h1 className=" text-[20px] md:text-[25px] font-semibold mb-2">
                                2. Use and Disclosure of Personal Information
                            </h1>
                            <p className="text-gray-700">
                                We use the personal information you provide to process your bookings,
                                communicate with you regarding your bookings, and improve our services.
                                We may also use your information to send you promotional emails or
                                newsletters, but you can opt out of receiving such communications at
                                any time.
                            </p>
                            <p className="text-gray-700">
                                We may share your personal information with our trusted partners and
                                service providers who assist us in delivering our services. However,
                                we will not sell, rent, or lease your personal information to any
                                third party unless we have your permission or are required by law to
                                do so.
                            </p>
                        </div>
                        <div>
                            <h1 className=" text-[20px] md:text-[25px] font-semibold mb-2">
                                3. Security Measures
                            </h1>
                            <p className="text-gray-700">
                                We take the security of your personal information seriously and
                                implement appropriate technical and organizational measures to protect
                                it. However, no method of transmission over the internet or electronic
                                storage is 100% secure, and we cannot guarantee the absolute security
                                of your information.
                            </p>
                            <p className="text-gray-700">
                                You are responsible for maintaining the confidentiality of any
                                passwords or account credentials associated with our website and
                                should not disclose them to any third party.
                            </p>
                        </div>
                        <div>
                            <h1 className=" text-[20px] md:text-[25px] font-semibold mb-2">
                                4. Cookies and Tracking Technologies
                            </h1>
                            <p className="text-gray-700">
                                We use cookies and similar tracking technologies to enhance your
                                experience on our website. These technologies allow us to recognize
                                your device, track your browsing behavior, and store certain
                                information. You can modify your browser settings to control the use
                                of cookies, but please note that disabling cookies may affect the
                                functionality of our website.
                            </p>
                        </div>
                        <div>
                            <h1 className=" text-[20px] md:text-[25px] font-semibold mb-2">
                                5. Third-Party Links
                            </h1>
                            <p className="text-gray-700">
                                Our website may contain links to third-party websites. These
                                third-party websites have their own privacy policies, and we are not
                                responsible for their practices. We encourage you to review the
                                privacy policies of these websites before providing any personal
                                information.
                            </p>
                        </div>
                    </section>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default PrivacyPolicy;