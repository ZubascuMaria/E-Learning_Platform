import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center px-4 py-20 text-center">
      <h1 className="text-ocean text-4xl font-bold mb-8">
        Contact us
      </h1>

      <p className="text-night text-3xl mb-1">
        If you have any questions or need support, do not hesitate to contact us!
      </p>
      <p className="text-night text-2xl mb-8">
        We will get back to you as soon as possible.
      </p>


      <div className="bg-cloud rounded-lg p-6 w-full max-w-xl flex flex-col gap-8 text-left">
   
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faPhone} className="text-ocean w-7 h-7" />
          <span className="text-mint text-2xl">0712 123 123</span>
        </div>

        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faEnvelope} className="text-ocean w-7 h-7" />
          <a href="mailto:studentUTcluj@gmail.com" className="text-mint text-2xl underline">
            studentUTcluj@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faLocationDot} className="text-ocean w-7 h-7" />
          <span className="text-mint text-2xl">
            437400 Main Street 19, CJ, Romania
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
