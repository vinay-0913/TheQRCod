import { Metadata } from "next";
import PrivacyPolicyPage from "../privacy/page";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy — The QR Code Generator",
  description:
    "Read The QR Code Generator Privacy Policy. Learn how we collect, protect, and process user data for static and dynamic QR code generation.",
  path: "/privacy-policy",
});

export default PrivacyPolicyPage;
