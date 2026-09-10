"use client";

import { useState } from "react";

const packageOptions = [
  ["starter", "Starter — ₹199"],
  ["research-pack", "Research Pack — ₹399"],
  ["deep-dive", "Deep Dive — ₹799"],
];

const serviceOptions = [
  "Research topic discovery",
  "Literature review / paper discovery",
  "Research gap exploration",
  "Research questions",
  "Complete Research Pack",
];

const initialForm = { name: "", email: "", topic: "", service: "", academicLevel: "", deadline: "", details: "" };

export default function RequestForm({ initialPackage }) {
  const [form, setForm] = useState(initialForm);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage || "");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!form.topic.trim()) nextErrors.topic = "Tell us your research topic or question.";
    if (!form.service) nextErrors.service = "Select the type of support you need.";
    if (!selectedPackage) nextErrors.package = "Select a research pack.";
    return nextErrors;
  }

  function submitRequest(event) {
    event.preventDefault();
    if (submitting || submitted) return;
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    if (!contactEmail) { setErrors({ form: "The contact email is not configured yet. Please use the Contact page instead." }); return; }

    setSubmitting(true);
    const packageLabel = packageOptions.find(([value]) => value === selectedPackage)?.[1] || selectedPackage;
    const body = [
      "New ScholarLens Research Request", "", `Name: ${form.name.trim()}`, `Email: ${form.email.trim()}`,
      `Research topic / question: ${form.topic.trim()}`, `What they need help with: ${form.service}`,
      `Academic level / background: ${form.academicLevel.trim() || "Not provided"}`, `Preferred deadline: ${form.deadline || "Not provided"}`,
      `Additional details: ${form.details.trim() || "Not provided"}`, `Package: ${packageLabel}`, "",
      "No payment has been completed. Please confirm scope and payment details with the customer.",
    ].join("\n");
    window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent("New ScholarLens Research Request")}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) return <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Request prepared</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-emerald-950">Request received!</h2><p className="mt-4 max-w-2xl leading-7 text-emerald-900/80">Thanks for your request. ScholarLens will review your research needs and contact you with the next steps and payment details.</p><p className="mt-4 text-sm leading-6 text-emerald-900/70">Your email app should now contain the request. Payment has not been completed.</p></section>;

  return <form onSubmit={submitRequest} noValidate className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8"><div className="space-y-7"><Field label="Name" name="name" value={form.name} onChange={updateField} error={errors.name} required autoComplete="name" /><Field label="Email" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} required autoComplete="email" /><Field label="Research topic / question" name="topic" value={form.topic} onChange={updateField} error={errors.topic} required textarea placeholder="Describe the topic, question, or project idea you are exploring." /><div><label htmlFor="service" className="text-sm font-medium">What do you need help with? <Required /></label><select id="service" name="service" value={form.service} onChange={updateField} className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option value="">Select a service</option>{serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>{errors.service ? <ErrorText>{errors.service}</ErrorText> : null}</div><fieldset><legend className="text-sm font-medium">Research pack <Required /></legend><div className="mt-3 grid gap-3 sm:grid-cols-3">{packageOptions.map(([value, label]) => <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-3 text-sm ${selectedPackage === value ? "border-primary bg-primary/5" : "border-border"}`}><input type="radio" name="package" value={value} checked={selectedPackage === value} onChange={() => { setSelectedPackage(value); setErrors((current) => ({ ...current, package: "" })); }} className="h-4 w-4 accent-primary" />{label}</label>)}</div>{errors.package ? <ErrorText>{errors.package}</ErrorText> : null}</fieldset><Field label="Academic level / background" name="academicLevel" value={form.academicLevel} onChange={updateField} placeholder="For example, undergraduate project or early-stage researcher" /><Field label="Preferred deadline" name="deadline" type="date" value={form.deadline} onChange={updateField} /><Field label="Additional details" name="details" value={form.details} onChange={updateField} textarea placeholder="Share any methods, fields, regions, datasets, or constraints that may help us understand your request." /><p className="border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">ScholarLens provides research discovery and organization support. We do not write assignments, theses, or papers for submission.</p>{errors.form ? <ErrorText>{errors.form}</ErrorText> : null}<button type="submit" disabled={submitting} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Preparing request…" : "Submit Research Request"}</button></div></form>;
}

function Required() { return <span className="text-destructive" aria-hidden="true">*</span>; }
function ErrorText({ children }) { return <p className="mt-2 text-sm text-destructive" role="alert">{children}</p>; }
function Field({ label, name, value, onChange, error, required, textarea, ...props }) {
  const id = `research-${name}`;
  return <div><label htmlFor={id} className="text-sm font-medium">{label} {required ? <Required /> : null}</label>{textarea ? <textarea id={id} name={name} value={value} onChange={onChange} rows={4} className="mt-2 block w-full resize-y rounded-md border border-input bg-background px-3 py-3 text-sm leading-6 outline-none focus:ring-2 focus:ring-ring" {...props} /> : <input id={id} name={name} value={value} onChange={onChange} className="mt-2 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" {...props} />}{error ? <ErrorText>{error}</ErrorText> : null}</div>;
}