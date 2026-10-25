# Pipe IT

Static website for Pipe IT, a Pipedrive affiliate partner in Auckland. It replaces the previous Zoho Sites build and is published with GitHub Pages at [pipeit.gobizit.com](https://pipeit.gobizit.com).

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `services.html` | Services |
| `about.html` | About |
| `contact.html` | Contact |
| `testimonial.html` | Client stories |

`css/styles.css` holds the shared layout. `js/main.js` runs the mobile menu, the forms, and reduced-motion handling for the product video. The header and footer are the same on every page.

Copy and links come from the Zoho Sites capture, including the original wording. The header and Contact “Call to Us” use `tel:+6421330266` (+64.21.330.266). The services page call line still shows +64.9.9408.101 (`tel:+6499408101`), and the home page structured-data telephone is still `+6499408101`.

The contact form and the footer subscribe form post to [FormSubmit](https://formsubmit.co/pipeit@gobizit.com), which emails `pipeit@gobizit.com`. With JavaScript, the page posts to `https://formsubmit.co/ajax/pipeit@gobizit.com` and shows a success or error message on the page. Without JavaScript, the form posts to `https://formsubmit.co/pipeit@gobizit.com`. The first submission triggers a one-time FormSubmit activation email to pipeit@gobizit.com that must be confirmed before later messages are delivered.

The home hero background video from the Zoho site was not part of the capture. That band is a green CSS bokeh field behind the Pipedrive partner image. `Welcome.gif` (about 3.1 MB) is published as `assets/welcome.mp4` (about 186 KB) with a WebP poster. `assets/zpstock-image-339.png` was an almost empty file in the capture and is not shown.

## Deploy

The site is plain HTML, CSS, and JavaScript at the repository root. GitHub Pages serves it with **branch deploy**. No GitHub Actions workflow is required. `.nojekyll` stops Jekyll from rewriting the site. `CNAME` contains exactly `pipeit.gobizit.com`.

### GitHub Pages

1. Open this repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and the folder to `/ (root)`.
5. Save. After the first publish, the custom domain in `CNAME` should show as `pipeit.gobizit.com`.

### Cloudflare DNS

In the Cloudflare zone for `gobizit.com`:

1. Add a **CNAME** record:
   - **Name:** `pipeit`
   - **Target:** `asets-gobizit.github.io`
   - **Proxy status:** DNS only (grey cloud)
2. Leave the record unproxied until GitHub has issued a certificate for `pipeit.gobizit.com`.
3. In the repository’s Pages settings, confirm the custom domain and turn on **Enforce HTTPS** once the certificate is ready.
4. Keep the Cloudflare record DNS only so GitHub continues to terminate TLS for the Pages site.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.
