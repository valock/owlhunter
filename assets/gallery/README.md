# Gallery photos

The home-page gallery has two ways to show real photos. Pick whichever you prefer.

## Option A — Auto-sync from Instagram (recommended)

Shows the latest @owl.hunter.1 posts and updates itself, using a free **Behold**
feed (no coding):

1. Go to https://behold.so and sign up (free).
2. Connect the Instagram account (@owl.hunter.1) and create a feed.
3. Copy the **feed ID**.
4. In `index.html`, find this line in the gallery section and paste the ID:

   ```html
   <div id="ig-feed" class="ig-feed" data-behold-id="PASTE_FEED_ID_HERE" hidden></div>
   ```

5. Deploy. The placeholder plates are replaced automatically by the live feed.
   (SnapWidget or LightWidget work too — just drop their embed in `#ig-feed`.)

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
