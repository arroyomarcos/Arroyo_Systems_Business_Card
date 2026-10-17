const profile = {
  // Edit this block to update the visible card, links, share text and generated VCF download.
  name: "Marcos Arroyo Navarro",
  role: "Fundador",
  company: "Arroyo Systems",
  tagline: "Diseñamos. Calculamos. Fabricamos.",
  location: "Madrid, Spain",
  phone: "+34 691 01 89 74",
  phoneHref: "+34691018974",
  email: "contact@arroyo-systems.com",
  website: "https://www.arroyo-systems.com",
  linkedin: "https://www.linkedin.com/company/arroyo-systems-eng/",
};

const $ = (selector) => document.querySelector(selector);
const shareButton = $("#shareButton");
const display = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

$("#personName").textContent = profile.name;
$("#roleText").textContent = profile.role;
$("#taglineText").textContent = profile.tagline;
$("#locationText").textContent = profile.location;

for (const [id, text, href] of [
  ["#phoneLink", profile.phone, `tel:${profile.phoneHref}`],
  ["#emailLink", profile.email, `mailto:${profile.email}`],
  ["#websiteLink", display(profile.website), profile.website],
  ["#linkedinLink", profile.company, profile.linkedin],
]) {
  $(id).textContent = text;
  $(id).href = href;
}

function buildVcard() {
  const [first, ...rest] = profile.name.split(" ");
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${rest.join(" ")};${first};;;`,
    `FN:${profile.name}`,
    `ORG:${profile.company}`,
    `TITLE:${profile.role}`,
    `TEL;TYPE=CELL,VOICE:${profile.phoneHref}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${profile.website}`,
    `URL;TYPE=LinkedIn:${profile.linkedin}`,
    `ADR;TYPE=WORK:;;;${profile.location.split(",")[0]};;;${profile.location.split(",")[1]?.trim() ?? ""}`,
    `NOTE:${profile.tagline}`,
    "END:VCARD",
  ].join("\r\n");
}

$("#saveContact").addEventListener("click", () => {
  const file = new Blob([buildVcard()], { type: "text/vcard;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "marcos-arroyo-navarro.vcf";
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
});

if (shareButton && navigator.share) {
  shareButton.hidden = false;
  shareButton.addEventListener("click", async () => {
    try {
      await navigator.share({
        title: `${profile.name} | ${profile.company}`,
        text: `${profile.role} en ${profile.company}`,
        url: window.location.href,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        window.location.href = `mailto:?subject=${encodeURIComponent(profile.name)}&body=${encodeURIComponent(window.location.href)}`;
      }
    }
  });
} else if (shareButton) {
  shareButton.hidden = true;
}
