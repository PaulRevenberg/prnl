import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import * as React from "react";
import { faCamera, faHouse, faImage } from "@fortawesome/free-solid-svg-icons";
const Landing = () => {
  return (
    <div className="flex h-screen snap-start snap-always flex-col bg-red-500">
      <div className="flex h-[100svh] flex-col gap-4 bg-neutral-50 landscape:flex-row ">
        <div className="align-center flex flex-grow flex-wrap content-center items-center justify-center px-4">
          <img
            className="aspect-portrait h-40 w-40 rounded-full"
            src="https://picsum.photos/200/200"
            alt=""
          />
          <div className="mt-4 flex flex-col items-center pl-2 sm:items-start">
            <span className="text-3xl text-zinc-800">Paul Revenberg</span>
            <span className=" text-zinc-400">Software Developer</span>
            <span className="flex gap-2 text-xl">
              <a
                href="https://www.linkedin.com/in/paul-revenberg-80b3b916b/"
                target="_blank"
                title="LinkedIn"
                rel="noopener"
              >
                <FontAwesomeIcon icon={faLinkedin} color="#0077B5" />
              </a>
              <a
                href="https://github.com/PaulRevenberg"
                target="_blank"
                title="Github"
                rel="noopener"
              >
                <FontAwesomeIcon icon={faGithub} color="#000000" />
              </a>
              <a href="#gallery" target="_blank" title="Github" rel="noopener">
                <FontAwesomeIcon icon={faImage} color="#000000" />
              </a>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4  landscape:aspect-[4/6] ">
          <div className="fake-img landscape:rounded-bl-md"></div>
          <img
            src="https://picsum.photos/200/150"
            alt=""
            className="aspect-[4/3] landscape:rounded-l-md"
          />
          <div className="fake-img landscape:rounded-tl-md"></div>
        </div>
      </div>
      <div className="w-full grow bg-neutral-800"></div>
    </div>
  );
};

export default Landing;
