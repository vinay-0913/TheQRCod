"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import {
  Link2,
  Type,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  Contact,
  Calendar,
} from "lucide-react";

export type DataType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "wifi"
  | "vcard"
  | "event";

interface DataTypeSelectorProps {
  dataType: DataType;
  data: string;
  onChange: (type: DataType, data: string) => void;
  allowedTypes?: DataType[];
}

const dataTypes: { type: DataType; label: string; icon: typeof Link2 }[] = [
  { type: "url", label: "Link", icon: Link2 },
  { type: "text", label: "Text", icon: Type },
  { type: "email", label: "Email", icon: Mail },
  { type: "phone", label: "Phone", icon: Phone },
  { type: "sms", label: "SMS", icon: MessageSquare },
  { type: "wifi", label: "WiFi", icon: Wifi },
  { type: "vcard", label: "vCard", icon: Contact },
  { type: "event", label: "Event", icon: Calendar },
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
  const [eventTitle, setEventTitle] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const buildWifiString = (ssid: string, pass: string, enc: string) =>
    `WIFI:T:${enc};S:${ssid};P:${pass};;`;

  const buildVcardString = (
    name: string,
    phone: string,
    email: string,
    org: string
  ) =>
    `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nORG:${org}\nEND:VCARD`;

  const buildEventString = (
    title: string,
    start: string,
    end: string,
    location: string
  ) => {
    const fmt = (d: string) => d.replace(/[-:]/g, "").replace("T", "T");
    return `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${fmt(start)}\nDTEND:${fmt(end)}\nLOCATION:${location}\nEND:VEVENT`;
  };

  const handleTypeChange = (type: DataType) => {
    onChange(type, "");
  };

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
                onChange(
                  dataType,
                  buildWifiString(e.target.value, wifiPassword, wifiEncryption)
                );
              }}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={wifiPassword}
              onChange={(e) => {
                setWifiPassword(e.target.value);
                onChange(
                  dataType,
                  buildWifiString(wifiSSID, e.target.value, wifiEncryption)
                );
              }}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink">Encryption</label>
              <select
                className="w-full px-4 py-3 rounded-sm bg-canvas text-ink border border-hairline focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                value={wifiEncryption}
                onChange={(e) => {
                  setWifiEncryption(e.target.value);
                  onChange(
                    dataType,
                    buildWifiString(wifiSSID, wifiPassword, e.target.value)
                  );
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
                onChange(
                  dataType,
                  buildVcardString(
                    e.target.value,
                    vcardPhone,
                    vcardEmail,
                    vcardOrg
                  )
                );
              }}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="+1234567890"
              value={vcardPhone}
              onChange={(e) => {
                setVcardPhone(e.target.value);
                onChange(
                  dataType,
                  buildVcardString(vcardName, e.target.value, vcardEmail, vcardOrg)
                );
              }}
            />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={vcardEmail}
              onChange={(e) => {
                setVcardEmail(e.target.value);
                onChange(
                  dataType,
                  buildVcardString(vcardName, vcardPhone, e.target.value, vcardOrg)
                );
              }}
            />
            <Input
              label="Organization"
              placeholder="Company Name"
              value={vcardOrg}
              onChange={(e) => {
                setVcardOrg(e.target.value);
                onChange(
                  dataType,
                  buildVcardString(vcardName, vcardPhone, vcardEmail, e.target.value)
                );
              }}
            />
          </div>
        );
      case "event":
        return (
          <div className="space-y-4">
            <Input
              label="Event Title"
              placeholder="Team Meeting"
              value={eventTitle}
              onChange={(e) => {
                setEventTitle(e.target.value);
                onChange(
                  dataType,
                  buildEventString(
                    e.target.value,
                    eventStart,
                    eventEnd,
                    eventLocation
                  )
                );
              }}
            />
            <Input
              label="Start Date & Time"
              type="datetime-local"
              value={eventStart}
              onChange={(e) => {
                setEventStart(e.target.value);
                onChange(
                  dataType,
                  buildEventString(
                    eventTitle,
                    e.target.value,
                    eventEnd,
                    eventLocation
                  )
                );
              }}
            />
            <Input
              label="End Date & Time"
              type="datetime-local"
              value={eventEnd}
              onChange={(e) => {
                setEventEnd(e.target.value);
                onChange(
                  dataType,
                  buildEventString(
                    eventTitle,
                    eventStart,
                    e.target.value,
                    eventLocation
                  )
                );
              }}
            />
            <Input
              label="Location"
              placeholder="123 Main St, City"
              value={eventLocation}
              onChange={(e) => {
                setEventLocation(e.target.value);
                onChange(
                  dataType,
                  buildEventString(
                    eventTitle,
                    eventStart,
                    eventEnd,
                    e.target.value
                  )
                );
              }}
            />
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-ink mb-4">Data Type</h2>
      {/* Type selector tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(allowedTypes ? dataTypes.filter((d) => allowedTypes.includes(d.type)) : dataTypes).map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleTypeChange(type)}
            className={`
              inline-flex items-center gap-2 px-3 py-2 rounded-sm text-sm font-medium
              transition-colors duration-150 cursor-pointer border
              ${
                dataType === type
                  ? "bg-primary text-white border-primary"
                  : "bg-canvas text-body border-hairline hover:border-hairline-strong"
              }
            `}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {/* Dynamic fields */}
      {renderFields()}
    </div>
  );
}
