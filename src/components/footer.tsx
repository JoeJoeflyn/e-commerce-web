import { faFacebook, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <>
      <hr />
      <div className="bg-white">
        <div className="max-w-5xl mx-auto py-10 px-3">
          <div className="flex flex-col md:flex-row items-start justify-between gap-3">
            <div className="flex flex-col gap-3">
              <p className="uppercase text-sm font-bold">Customer support</p>
              <a href="#" className="text-[#777777] text-sm">
                Customer service
              </a>
              <a href="#" className="text-[#777777] text-sm">
                Safe trading
              </a>
              <a href="#" className="text-[#777777] text-sm">
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="uppercase text-sm font-bold">About us</p>
              <a href="#" className="text-[#777777] text-sm">
                About
              </a>
              <a href="#" className="text-[#777777] text-sm">
                Privacy policy
              </a>
              <a href="#" className="text-[#777777] text-sm">
                Dispute resolution
              </a>
              <a href="#" className="text-[#777777] text-sm">
                career
              </a>
              <a href="#" className="text-[#777777] text-sm">
                Media
              </a>
              <a href="#" className="text-[#777777] text-sm">
                Blog
              </a>
            </div>
            <div>
              <p className="uppercase text-sm font-bold">Social Media</p>
              <div className="flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  className="text-[#285fbd] cursor-pointer"
                  icon={faFacebook}
                  width={30}
                  size="3x"
                />
                <FontAwesomeIcon
                  className="text-[#f41010] cursor-pointer"
                  icon={faPlayCircle}
                  width={30}
                  size="3x"
                />
                <FontAwesomeIcon
                  className="text-white cursor-pointer bg-[#0a66c2] inline-block rounded-full p-2"
                  icon={faLinkedinIn}
                  width={16}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="text-center py-3">
          © 2024 Nguyen Thai Tai, All rights reserved
        </p>
      </div>
    </>
  );
}
