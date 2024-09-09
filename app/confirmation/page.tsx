"use client";
import Confirmation from "../../components/Confirmation";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const confirmationNumber = searchParams.get("confirmationNumber");
  console.log(searchParams);
  return <Confirmation confirmationNumber={confirmationNumber} />;
}
