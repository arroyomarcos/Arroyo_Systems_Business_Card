const profile = {
  // Edit this block to update the visible card, links, share text and generated VCF download.
  name: "Marcos Arroyo Navarro",
  role: "Founder | Chief Engineer",
  company: "Arroyo Systems",
  tagline: "Engineering for Machined Components",
  location: "Madrid, Spain",
  phone: "+34 691 01 89 74",
  phoneHref: "+34691018974",
  email: "marcos@arroyo-systems.com",
  website: "https://www.arroyo-systems.com",
  linkedin: "https://www.linkedin.com/company/arroyo-systems-eng/",
  vcard: "assets/marcos-arroyo-navarro.vcf",
};

const card = document.querySelector("#businessCard");
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

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setTilt(xRatio, yRatio, strength = 5) {
  if (!card || prefersReducedMotion) return;
  const rotateY = (xRatio - 0.5) * strength;
  const rotateX = (0.5 - yRatio) * strength;
  card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
  card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
  card.style.setProperty("--shine-x", `${Math.round(xRatio * 100)}%`);
  card.style.setProperty("--shine-y", `${Math.round(yRatio * 100)}%`);
}

function resetTilt() {
  if (!card || prefersReducedMotion) return;
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
  card.style.setProperty("--shine-x", "50%");
  card.style.setProperty("--shine-y", "18%");
}

if (card && !prefersReducedMotion) {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    setTilt((event.clientX - rect.left) / rect.width, (event.clientY - rect.top) / rect.height, 6);
  });

  card.addEventListener("pointerleave", resetTilt);

  card.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      const rect = card.getBoundingClientRect();
      setTilt((touch.clientX - rect.left) / rect.width, (touch.clientY - rect.top) / rect.height, 3);
    },
    { passive: true },
  );

  window.addEventListener("deviceorientation", (event) => {
    if (event.gamma == null || event.beta == null) return;
    const xRatio = Math.min(Math.max((event.gamma + 18) / 36, 0), 1);
    const yRatio = Math.min(Math.max((event.beta - 20) / 50, 0), 1);
    setTilt(xRatio, yRatio, 3.4);
  });
}

if (shareButton && navigator.share) {
  shareButton.hidden = false;
  shareButton.addEventListener("click", async () => {
    try {
      await navigator.share({
        title: `${profile.name} | ${profile.company}`,
        text: `${profile.role} at ${profile.company}`,
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
