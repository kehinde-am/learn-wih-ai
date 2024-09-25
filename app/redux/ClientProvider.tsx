"use client";

import { Provider } from "react-redux";
import { store } from "@/app/redux/store"; // Adjust the path to your store

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
