"use client";

import Link from "next/link";
import { trackEvent } from "./gaEvents";
import React from "react";

type TrackLinkProps = React.ComponentProps<typeof Link> & {
  eventName: string;
  eventParams?: Record<string, any>;
};

export default function TrackLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(eventName, eventParams ?? {});
        onClick?.(e);
      }}
    />
  );
}
