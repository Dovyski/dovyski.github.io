# Layered homepage assets

Created with the built-in image generation tool. Both use
`public/img/fernando-spacewalk.png` as the edit reference.

## Astronaut cutout

Saved as `public/img/fernando-astronaut-cutout.png`. RGBA transparency verified.

Use case: background-extraction. Edit the supplied image. Extract ONLY the astronaut including his complete suit, gloves, helmet, visible face, boots and curved tether. Preserve his exact recognizable identity, pose, face, suit details, illumination and photographic texture from the original. Remove ALL Earth and space background. Output a true RGBA PNG with genuine transparent alpha around the subject and through gaps between limbs and tether, NOT a checkerboard painted into the image. Center the full astronaut in a portrait-oriented canvas with modest transparent padding around the outermost boundaries; keep every boot and glove visible. Do not add shadows on a ground plane, text, logos or anything else.

## Space background

Saved as `public/img/space-earth-background.png`.

Use case: precise-object-edit. Edit the supplied spacewalk photo to create a background plate for a full-width website hero. Remove the astronaut and the complete tether entirely, reconstructing unobstructed deep black space and the natural curved Earth horizon behind him. Preserve the archival photographic texture, subdued colors, lighting and atmosphere. Expand to an ultrawide landscape composition, approximately 2.5:1, mostly deep black empty space in the upper 75 percent with the curved blue-white Earth limb crossing the lower portion. No astronaut, people, spacecraft, tether, typography, logos, bright nebulae or exaggerated stars. This is the space background layer; a separate astronaut will be composited over it in CSS.
