import React from "react";
import DrawerAppBar from "./Navbar/DrawerAppBar";
import Footer from "./Footer";


const TermsAndConditions = () => {

  return (
    <>
      <DrawerAppBar />

      <section className="bg-gray-100 text-start">

        <style>
          {`
        .section-heading {
          font-size: 24px;
        }
        p{
          font-size: 16px;
        }
        `}
        </style>
        <div className="px-5 py-10 bg-white max-w-4xl mx-auto pt-10">
          <h1 className="text-center font-sans md:text-4xl text-[30px] font-bold tracking-wide underline underline-offset-1 text-gray-900">
            Terms and Conditions
          </h1>
          <section className="grid gap-y-4">
            <div>
              <h1 className="  text-[30px] font-medium mb-2">
                1. Introduction
              </h1>
              <p className="text-gray-700">
                These Website Standard Terms And Conditions (these "Terms" or these
                "Website Standard Terms And Conditions") contained herein on this
                webpage, shall govern your use of this website, including all pages
                within this website (collectively referred to herein below as this
                "Website"). These Terms apply in full force and effect to your use
                of this Website and by using this Website, you expressly accept all
                terms and conditions contained herein in full. You must not use this
                Website if you have any objection to any of these Website Standard
                Terms And Conditions.
              </p>
              <p className="text-gray-700">
                This Website is not for use by any minors (defined as those who are
                not at least 18 years of age), and you must not use this Website if
                you are a minor.
              </p>
            </div>
            <div>
              <h1 className="  text-[30px] font-medium mb-2">
                2. Intellectual Property Rights
              </h1>
              <p className="text-gray-700">
                Other than content you own, which you may have opted to include on
                this Website, under these Terms, and/or its licensors own all rights
                to the intellectual property and material contained in this Website,
                and all such rights are reserved.
              </p>
              <p className="text-gray-700">
                You are granted a limited license only, subject to the restrictions
                provided in these Terms, for purposes of viewing the material
                contained on this Website.
              </p>
            </div>
            <div>
              <h1 className="  text-[30px] font-medium mb-2">
                3. Restrictions{" "}
              </h1>
              <p className="text-gray-700">
                You are expressly and emphatically restricted from all of the
                following:
              </p>

              <ol className="list-disc px-10 text-gray-700">
                <li>publishing any Website material in any media;</li>
                <li>
                  selling, sublicensing and/or otherwise commercializing any
                  Website material;
                </li>
                <li>publicly performing and/or showing any Website material;</li>
                <li>
                  using this Website in any way that is, or may be, damaging to
                  this Website;
                </li>
                <li>
                  using this Website in any way that impacts user access to this
                  Website;
                </li>
                <li>
                  using this Website contrary to applicable laws and regulations,
                  or in a way that causes, or may cause, harm to the Website, or
                  to any person or business entity;
                </li>
                <li>
                  engaging in any data mining, data harvesting, data extracting or
                  any other similar activity in relation to this Website, or while
                  using this Website;
                </li>
              </ol>
              <p className="text-gray-700">
                Certain areas of this Website are restricted from access by you and
                may further restrict access by you to any areas of this Website, at
                any time, in its sole and absolute discretion. Any user ID and
                password you may have for this Website are confidential, and you
                must maintain the confidentiality of such information.
              </p>
            </div>
            <div>
              <h1 className="  text-[30px] font-medium mb-2">
                4. Your Content{" "}
              </h1>
              <p className="text-gray-700">
                In these Website Standard Terms And Conditions, "Your Content" shall
                mean any audio, video, text, images, or other material you choose to
                display on this Website. With respect to Your Content, by displaying
                it, you grant a non-exclusive, worldwide, irrevocable, royalty-free,
                sublicensable license to use, reproduce, adapt, publish, translate,
                and distribute it in anymedia.
              </p>
              <p className="text-gray-700">
                Your Content must be your own and must not be infringing on any
                third party's rights. The Company reserves the right to remove any
                of Your Content from this Website at any time, and for any reason,
                without notice.
              </p>
            </div>
            <div>
              <h1 className="  text-[30px] font-medium mb-2">
                5. No warranties
              </h1>
              <p className="text-gray-700">
                This Website is provided "as is," with all faults, and the Company
                makes no express or implied representations or warranties, of any
                kind related to this Website or the materials contained on this
                Website. Additionally, nothing contained on this Website shall be
                construed as providing consult or advice to you.
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default TermsAndConditions;