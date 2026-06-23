# Gallery photos

The home-page gallery has two ways to show real photos. Pick whichever you prefer.

## Option A — Embed public Instagram posts (in use)

Shows specific public posts using Instagram's official embed. **No account
access needed** — only the public post links.

1. Open the post on Instagram and copy its link
   (format `https://www.instagram.com/p/SHORTCODE/`, or `/reel/SHORTCODE/`).
2. In `script.js`, edit the `posts` array inside `initInstagram()`:

   ```js
   var posts = [
     "https://www.instagram.com/p/DZv0w1MxY0I/",
     // add or remove links here, in display order
   ];
   ```

3. Deploy. The embeds replace the placeholder plates automatically. Leave the
   array empty to fall back to the designed plates.

## Option B — Hand-picked photos

Full control and the fastest-loading result (no third-party script). Drop images
here (4:3 portrait works best):

- `owl-dusk.jpg`
- `sawgrass.jpg`
- `spoonbill.jpg`
- `moonrise.jpg`

Then set a background image on the matching `.plate__art` in `index.html`:

```html
<div class="plate__art" style="background-image:url('/assets/gallery/owl-dusk.jpg')"></div>
```

Until either option is set up, the designed CSS placeholder plates show, so the
page never looks broken.
