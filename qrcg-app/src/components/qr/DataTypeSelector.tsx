"use client";

import { useRef, useState } from "react";
import Input from "@/components/ui/Input";
import {
  Link2,
  Type,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  Contact,
  Share2,
  Grid3x3,
  MapPin,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaWhatsapp,
  FaSpotify,
} from "react-icons/fa6";

export type DataType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "wifi"
  | "vcard"
  | "social"
  | "app"
  | "upi"
  | "location"
  | "whatsapp";

interface DataTypeSelectorProps {
  dataType: DataType;
  data: string;
  onChange: (type: DataType, data: string) => void;
  allowedTypes?: DataType[];
}

const dataTypes: { type: DataType; label: string; icon: React.ElementType }[] = [
  { type: "url", label: "URL", icon: Link2 },
  { type: "text", label: "Text", icon: Type },
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "sms", label: "SMS", icon: MessageSquare },
  { type: "wifi", label: "WiFi", icon: Wifi },
  { type: "vcard", label: "vCard", icon: Contact },
  { type: "social", label: "Social", icon: Share2 },
  { type: "app", label: "App", icon: Grid3x3 },
  { type: "upi", label: "UPI", icon: IndianRupee },
  { type: "location", label: "Location", icon: MapPin },
  { type: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
];

// Social platform options
const socialPlatforms = [
  { id: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourname", color: "#1877F2", Icon: FaFacebook },
  { id: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel", color: "#FF0000", Icon: FaYoutube },
  { id: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourname", color: "#E1306C", Icon: FaInstagram },
  { id: "whatsapp", label: "WhatsApp", placeholder: "https://wa.me/1234567890", color: "#25D366", Icon: FaWhatsapp },
  { id: "twitter", label: "Twitter / X", placeholder: "https://x.com/yourname", color: "#000000", Icon: FaXTwitter },
  { id: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourname", color: "#0A66C2", Icon: FaLinkedin },
  { id: "snapchat", label: "Snapchat", placeholder: "https://snapchat.com/add/yourname", color: "#FFFC00", Icon: FaSnapchat },
  { id: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourname", color: "#000000", Icon: FaTiktok },
  { id: "spotify", label: "Spotify", placeholder: "https://open.spotify.com/artist/yourname", color: "#1DB954", Icon: FaSpotify },
];

// App store options
const appStores = [
  { id: "appstore", label: "App Store", placeholder: "https://apps.apple.com/app/your-app/id123456789" },
  { id: "playstore", label: "Play Store", placeholder: "https://play.google.com/store/apps/details?id=com.yourapp" },
];

export default function DataTypeSelector({
  dataType,
  data,
  onChange,
  allowedTypes,
}: DataTypeSelectorProps) {
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState("WPA");
  const [vcardName, setVcardName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardOrg, setVcardOrg] = useState("");
  const [selectedSocial, setSelectedSocial] = useState("facebook");
  const [selectedApp, setSelectedApp] = useState("appstore");
  const [upiId, setUpiId] = useState("");
  const [upiName, setUpiName] = useState("");
  const [upiAmount, setUpiAmount] = useState("");
  const [upiNote, setUpiNote] = useState("");
  const [geoLat, setGeoLat] = useState("");
  const [geoLng, setGeoLng] = useState("");
  const [waPhone, setWaPhone] = useState("");
  const [waMessage, setWaMessage] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
    }
  };

  const buildWifiString = (ssid: string, pass: string, enc: string) =>
    `WIFI:T:${enc};S:${ssid};P:${pass};;`;

  const buildVcardString = (
    name: string,
    phone: string,
    email: string,
    org: string
  ) =>
    `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${org}\nEND:VCARD`;

  const buildUpiString = (id: string, name: string, amount: string, note: string) => {
    let uri = `upi://pay?pa=${encodeURIComponent(id)}&pn=${encodeURIComponent(name)}`;
    if (amount) uri += `&am=${encodeURIComponent(amount)}`;
    if (note) uri += `&tn=${encodeURIComponent(note)}`;
    return uri;
  };

  const buildGeoString = (lat: string, lng: string) => `geo:${lat},${lng}`;

  const buildWhatsAppString = (phone: string, message: string) => {
    const cleaned = phone.replace(/\D/g, "");
    let url = `https://wa.me/${cleaned}`;
    if (message) url += `?text=${encodeURIComponent(message)}`;
    return url;
  };

  const handleTypeChange = (type: DataType) => {
    onChange(type, "");
  };

  const visibleTypes = allowedTypes
    ? dataTypes.filter((d) => allowedTypes.includes(d.type))
    : dataTypes;

  const renderFields = () => {
    switch (dataType) {
      case "url":
        return (
          <Input
            label="URL"
            type="url"
            placeholder="https://example.com"
            value={data}
            onChange={(e) => onChange(dataType, e.target.value)}
          />
        );
      case "text":
        return (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink" htmlFor="qr-text">
              Text
            </label>
            <textarea
              id="qr-text"
              className="w-full px-4 py-3 rounded-sm bg-canvas text-ink border border-hairline placeholder:text-mute focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y min-h-[100px]"
              placeholder="Enter your text..."
              value={data}
              onChange={(e) => onChange(dataType, e.target.value)}
            />
          </div>
        );
      case "email":
        return (
          <Input
            label="Email Address"
            type="email"
            placeholder="hello@example.com"
            value={data.replace(/^mailto:/i, "")}
            onChange={(e) => onChange(dataType, `mailto:${e.target.value}`)}
          />
        );
      case "phone":
        return (
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1234567890"
            value={data.replace(/^tel:/i, "")}
            onChange={(e) => onChange(dataType, `tel:${e.target.value}`)}
          />
        );
      case "sms":
        return (
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1234567890"
            value={data.replace(/^sms:/i, "")}
            onChange={(e) => onChange(dataType, `sms:${e.target.value}`)}
          />
        );
      case "wifi":
        return (
          <div className="space-y-4">
            <Input
              label="Network Name (SSID)"
              placeholder="MyWiFiNetwork"
              value={wifiSSID}
              onChange={(e) => {
                setWifiSSID(e.target.value);
                onChange(dataType, buildWifiString(e.target.value, wifiPassword, wifiEncryption));
              }}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={wifiPassword}
              onChange={(e) => {
                setWifiPassword(e.target.value);
                onChange(dataType, buildWifiString(wifiSSID, e.target.value, wifiEncryption));
              }}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Encryption</label>
              <select
                className="w-full px-4 py-3 rounded-sm bg-canvas text-ink border border-hairline focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                value={wifiEncryption}
                onChange={(e) => {
                  setWifiEncryption(e.target.value);
                  onChange(dataType, buildWifiString(wifiSSID, wifiPassword, e.target.value));
                }}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
          </div>
        );
      case "vcard":
        return (
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={vcardName}
              onChange={(e) => {
                setVcardName(e.target.value);
                onChange(dataType, buildVcardString(e.target.value, vcardPhone, vcardEmail, vcardOrg));
              }}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="+1234567890"
              value={vcardPhone}
              onChange={(e) => {
                setVcardPhone(e.target.value);
                onChange(dataType, buildVcardString(vcardName, e.target.value, vcardEmail, vcardOrg));
              }}
            />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={vcardEmail}
              onChange={(e) => {
                setVcardEmail(e.target.value);
                onChange(dataType, buildVcardString(vcardName, vcardPhone, e.target.value, vcardOrg));
              }}
            />
            <Input
              label="Organization"
              placeholder="Company Name"
              value={vcardOrg}
              onChange={(e) => {
                setVcardOrg(e.target.value);
                onChange(dataType, buildVcardString(vcardName, vcardPhone, vcardEmail, e.target.value));
              }}
            />
          </div>
        );
      case "social": {
        const platform = socialPlatforms.find((p) => p.id === selectedSocial)!;
        return (
          <div className="space-y-4">
            <p className="text-sm text-mute">Easily share any social link</p>
            <div className="flex flex-wrap gap-2">
              {socialPlatforms.map((p) => {
                const isActive = selectedSocial === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    title={p.label}
                    onClick={() => {
                      setSelectedSocial(p.id);
                      onChange(dataType, "");
                    }}
                    style={{
                      color: p.color,
                      borderColor: isActive ? p.color : "transparent",
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-sm border bg-canvas cursor-pointer transition-colors duration-150"
                  >
                    <p.Icon className="w-7 h-7" />
                  </button>
                );
              })}
            </div>
            <Input
              label={`Enter your ${platform.label} URL`}
              type="url"
              placeholder={platform.placeholder}
              value={data}
              onChange={(e) => onChange(dataType, e.target.value)}
            />
          </div>
        );
      }
      case "app": {
        const store = appStores.find((s) => s.id === selectedApp)!;
        return (
          <div className="space-y-4">
            <p className="text-sm text-mute">Link directly to your app listing</p>
            <div className="flex gap-2">
              {appStores.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedApp(s.id);
                    onChange(dataType, "");
                  }}
                  className={`px-3 py-1.5 rounded-sm text-sm font-medium border transition-colors cursor-pointer ${selectedApp === s.id
                    ? "bg-primary text-white border-primary"
                    : "bg-canvas text-body border-hairline hover:border-hairline-strong"
                    }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <Input
              label={`${store.label} URL`}
              type="url"
              placeholder={store.placeholder}
              value={data}
              onChange={(e) => onChange(dataType, e.target.value)}
            />
          </div>
        );
      }
      case "upi":
        return (
          <div className="space-y-4">
            <p className="text-sm text-mute">Generate a UPI payment QR — works with any UPI app</p>
            <Input
              label="UPI ID"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                onChange(dataType, buildUpiString(e.target.value, upiName, upiAmount, upiNote));
              }}
            />
            <Input
              label="Payee Name"
              placeholder="John Doe"
              value={upiName}
              onChange={(e) => {
                setUpiName(e.target.value);
                onChange(dataType, buildUpiString(upiId, e.target.value, upiAmount, upiNote));
              }}
            />
            <Input
              label="Amount (optional)"
              type="number"
              placeholder="0.00"
              value={upiAmount}
              onChange={(e) => {
                setUpiAmount(e.target.value);
                onChange(dataType, buildUpiString(upiId, upiName, e.target.value, upiNote));
              }}
            />
            <Input
              label="Note (optional)"
              placeholder="Payment for services"
              value={upiNote}
              onChange={(e) => {
                setUpiNote(e.target.value);
                onChange(dataType, buildUpiString(upiId, upiName, upiAmount, e.target.value));
              }}
            />
          </div>
        );
      case "location":
        return (
          <div className="space-y-4">
            <p className="text-sm text-mute">Opens in Google Maps / Apple Maps when scanned</p>
            <Input
              label="Latitude"
              placeholder="28.6139"
              value={geoLat}
              onChange={(e) => {
                setGeoLat(e.target.value);
                onChange(dataType, buildGeoString(e.target.value, geoLng));
              }}
            />
            <Input
              label="Longitude"
              placeholder="77.2090"
              value={geoLng}
              onChange={(e) => {
                setGeoLng(e.target.value);
                onChange(dataType, buildGeoString(geoLat, e.target.value));
              }}
            />
          </div>
        );
      case "whatsapp":
        return (
          <div className="space-y-4">
            <p className="text-sm text-mute">Scan to open WhatsApp with a pre-filled message</p>
            <Input
              label="Phone Number (with country code)"
              type="tel"
              placeholder="+919876543210"
              value={waPhone}
              onChange={(e) => {
                setWaPhone(e.target.value);
                onChange(dataType, buildWhatsAppString(e.target.value, waMessage));
              }}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Message (optional)</label>
              <textarea
                className="w-full px-4 py-3 rounded-sm bg-canvas text-ink border border-hairline placeholder:text-mute focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y min-h-[80px]"
                placeholder="Hi! I scanned your QR code..."
                value={waMessage}
                onChange={(e) => {
                  setWaMessage(e.target.value);
                  onChange(dataType, buildWhatsAppString(waPhone, e.target.value));
                }}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="overflow-hidden min-w-0">
      {/* Arrow slider tabs */}
      <div className="relative flex items-center gap-1 mb-6">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-sm bg-canvas text-body hover:text-ink transition-colors cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-1.5 overflow-x-auto scroll-smooth flex-1 min-w-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {visibleTypes.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`
                flex-shrink-0 inline-flex flex-col items-center gap-1 px-3 py-2.5 rounded-sm text-xs font-medium
                transition-colors duration-150 cursor-pointer border min-w-[64px]
                ${dataType === type
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-canvas text-body border-hairline hover:border-hairline-strong hover:text-ink"
                }
              `}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-sm bg-canvas text-body hover:text-ink transition-colors cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic fields */}
      {renderFields()}
    </div>
  );
}
