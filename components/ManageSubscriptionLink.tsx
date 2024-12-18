"use client";
import React, { useEffect, useState } from "react";

import { createPortalSession } from "@/lib/actions/stripe.actions";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { se } from "date-fns/locale";
import { Settings } from "lucide-react";

const ManageSubscriptionLink = ({
  stripeCustomerId,
  styles,
}: {
  stripeCustomerId: string;
  styles: string;
}) => {
  // Only render the button if the user is logged in and has a stripe customer id
  const [portalUrl, setPortalUrl] = useState<string>("");

  //   useEffect(() => {
  //     const fetchSubscription = async () => {
  //       const url = await createPortalSession();

  //       if (url) {
  //         setPortalUrl(url);
  //       } else {
  //         setPortalUrl(null);
  //       }
  //     };
  //     fetchSubscription();s
  //   }, []);

  //   if (!portalUrl) return null;
  useEffect(() => {
    const getPoralUrl = async () => {
      const { url } = await createPortalSession(stripeCustomerId);
      setPortalUrl(url);
    };
    getPoralUrl();
  }, []);

  return (
    <Link className={styles} href={portalUrl}>
      <div className="flex items-center">
        <Settings className="md:hidden mr-6 size-8" />
        Mitgliedschaft
      </div>
    </Link>
  );
};

export default ManageSubscriptionLink;
