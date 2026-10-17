# Arroyo Systems Business Card

Static digital business card for Marcos Arroyo Navarro and Arroyo Systems, ready to publish with GitHub Pages.

## Files

- `index.html`: page markup and Open Graph metadata.
- `styles.css`: mobile-first visual design, responsive layout, glassmorphism and animations.
- `script.js`: editable profile configuration, 3D/touch movement and Web Share API.

- `assets/arroyo-systems-logo-transparent.png`: logo prepared without the original white rectangle.
- `assets/favicon.png` and `assets/apple-touch-icon.png`: icon assets.

## Edit Contact Data

Update the profile data in `script.js`. The visible card, links, share text and downloaded contact are generated from this block:

```js
const profile = {
  phone: "+34 691 01 89 74",
  phoneHref: "+34691018974",
  email: "contact@arroyo-systems.com",
  linkedin: "https://www.linkedin.com/company/arroyo-systems-eng/",
};
```

`assets/marcos-arroyo-navarro.vcf` is included as a static fallback, but modern browsers download the VCF generated from `script.js`.

After publishing, replace the Open Graph image URL in `index.html` with the final absolute GitHub Pages URL for the strongest WhatsApp and LinkedIn previews.

## Publish With GitHub Pages

1. Push these files to the repository.
2. In GitHub, open Settings > Pages.
3. Choose the branch and root folder.
4. Save and wait for GitHub Pages to publish the site.

The site has no backend and no build step.
