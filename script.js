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
  vcard: "assets/marcos-arroyo-navarro.vcf",
};

const shareButton = document.querySelector("#shareButton");

document.querySelector("#personName").textContent = profile.name;
document.querySelector("#roleText").textContent = profile.role;
document.querySelector("#taglineText").textContent = profile.tagline;
document.querySelector("#locationText").textContent = profile.location;
document.querySelector("#saveContact").href = profile.vcard;
document.querySelector("#phoneLink").href = `tel:${profile.phoneHref}`;
document.querySelector("#emailLink").href = `mailto:${profile.email}`;
document.querySelector("#linkedinLink").href = profile.linkedin;
document.querySelector("#websiteLink").href = profile.website;
document.querySelector("#phoneText").textContent = profile.phone;
document.querySelector("#phoneText").href = `tel:${profile.phoneHref}`;
document.querySelector("#emailText").textContent = profile.email;
document.querySelector("#emailText").href = `mailto:${profile.email}`;
document.querySelector("#webText").textContent = profile.website.replace(/^https?:\/\/(www\.)?/, "");
document.querySelector("#webText").href = profile.website;

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
