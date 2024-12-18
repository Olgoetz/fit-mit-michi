"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import AdminLink from "./AdminLink";
import { siInstagram, siFacebook, siLinktree } from "simple-icons";
import { log } from "console";
import { extraLinks } from "@/constants";

const socialMediaLinks = [
  {
    name: "Instagram",
    logo: siInstagram,
    url: "https://www.instagram.com/michaela_suessbauer/",
  },
  {
    name: "Facebook",
    logo: siFacebook,
    url: "https://www.facebook.com/michaelasuessbauer1.de/?locale=de_DE",
  },
  {
    name: "LinkTree",
    logo: siLinktree,
    url: "https://linktr.ee/michi_suessbauer",
  },
];
const Footer = () => {
  const pathName = usePathname();
  if (pathName.startsWith("/admin")) {
    return null;
  }
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-black mt-20 pt-12 py-8">
      <div className="container mx-auto w-full text-white bg-black">
        <div className="grid md:grid-cols-3 text-center gap-x-4 gap-y-8">
          <div>
            <h3 className="pb-4">Links</h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              {extraLinks.map((link) => (
                <Link
                  href={`https://${link}`}
                  key={link}
                  className="text-white"
                >
                  {link}
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="pb-4">Social Media</h3>
            <div className="flex flex-col gap-y-4 items-center">
              {socialMediaLinks.map((link) => (
                <Link href={link.url} key={link.name}>
                  <svg
                    key={link.name}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                  >
                    <path d={link.logo.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="pb-4">Sonstiges</h3>
            <ul className="flex flex-col gap-y-2 text-sm">
              <Link href="/faq">FAQ</Link>
              <Link href="/datenschutz">Datenschutzerklärung</Link>
              <Link href="/impressum">Impressum</Link>
              <AdminLink />
            </ul>
          </div>
        </div>

        <div className="text-xs text-center mt-14">
          <p>© Michaela Süßbauer 2024 </p>
          <p>
            Design und Implementiertung von{" "}
            <a href="mailto:info@goetz-oliver.de" className="text-pink-700">
              Oliver Götz
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
