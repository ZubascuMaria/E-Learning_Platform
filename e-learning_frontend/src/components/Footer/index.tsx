import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const isContactPage = window.location.pathname === "/contact-us";
  return (
    <footer className="bg-cloud py-6 px-6 flex items-center justify-between text-night">
      <div className="flex items-center gap-4 ml-8">
        <FontAwesomeIcon icon={faFacebookF} className="w-7 h-7" />
        <FontAwesomeIcon icon={faInstagram} className="w-7 h-7" />
      </div>

      {!isContactPage && (
        <a
          href="/contact-us"
          className="text-xl underline underline-offset-4 hover:opacity-70 mr-8"
        >
          Contact Us
        </a>
      )}
    </footer>
  );
};

export default Footer;
