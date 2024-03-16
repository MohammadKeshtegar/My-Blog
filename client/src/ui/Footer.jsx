import { FaLinkedin } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t-2 bg-neutral-800 border-emerald-500 p-4 flex items-center justify-between px-10 py-7">
      <img src="/MB.png" alt="Logo" className="w-28" />

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg">You can follow me in</p>
          <div className="flex gap-3">
            <Link>
              <FaLinkedin className="text-2xl hover:text-emerald-500 transition-all" />
            </Link>

            <Link>
              <FaTelegram className="text-2xl hover:text-emerald-500 transition-all" />
            </Link>

            <Link>
              <FaGithub className="text-2xl hover:text-emerald-500 transition-all" />
            </Link>
          </div>
        </div>

        <p className="font-sans text-xs text-center text-neutral-400">
          &copy; 2024 Inc, by Mohammad Keshtegar, All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
