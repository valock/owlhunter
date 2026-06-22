# Gallery photos

Drop your real wildlife photos here to replace the placeholder "plates" on the
home page.

Suggested filenames (4:3 portrait works best):

- `owl-dusk.jpg`
- `sawgrass.jpg`
- `spoonbill.jpg`
- `moonrise.jpg`

Then, in `index.html`, set a background image on the matching `.plate__art`,
for example:

```html
<div class="plate__art" style="background-image:url('/assets/gallery/owl-dusk.jpg')"></div>
```

The CSS gradient placeholders show through until a photo is added, so the page
never looks broken while you collect images.
