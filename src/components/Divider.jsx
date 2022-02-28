import React from "react";
export default function Divider({ msg }) {
  return (
    <div class="relative flex py-6 items-center bg-white">
      <div class="flex-grow border-t border-primary"></div>
      <span class="flex-shrink mx-4 text-primary">{msg}</span>
      <div class="flex-grow border-t border-primary"></div>
    </div>
  );
}
