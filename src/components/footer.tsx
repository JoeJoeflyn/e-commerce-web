import { faFacebook, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <>
      <hr />
      <div className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center p-5 flex flex-col gap-3">
            <div className="text-2xl font-bold">Lorem ipsum dolor</div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Recusandae non est omnis laboriosam quia dicta harum ullam
              eligendi velit consequuntur, blanditiis fuga tempore corrupti odio
              dolore adipisci doloribus maiores minima?
            </p>
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
            <div className="flex justify-center items-center gap-3">
              <a
                href="#"
                className="p-2 border border-slate-500 rounded-full hover:shadow hover:bg-slate-50"
              >
                Home
              </a>
              <a
                href="#"
                className="p-2 border border-slate-500 rounded-full hover:shadow hover:bg-slate-50"
              >
                About
              </a>
              <a
                href="#"
                className="p-2 border border-slate-500 rounded-full hover:shadow hover:bg-slate-50"
              >
                Contact
              </a>
              <a
                href="#"
                className="p-2 border border-slate-500 rounded-full hover:shadow hover:bg-slate-50"
              >
                Privacy policy
              </a>
            </div>
          </div>
        </div>
        <hr />
        <p className="bg-[#f4b919] text-center py-3">
          ©2024, All rights reserved
        </p>
      </div>
    </>
  );
}
