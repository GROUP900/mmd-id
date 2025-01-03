# Pre-rendered id photos

Since we now have dynamically [generated functions](../generator/README.md), when we need to create or reference an avatar, our instinct might lead us to consider using dynamic generation functions.

However, because materials from different races cannot be combined, the possible combinations for generation are actually quite limited.

In this case, pre-rendered images will always be more efficient than real-time generation, and won't be restricted by the reference environment.

In this repository, we generate all possible avatar combinations through scripts, deploy them to npm, and then distribute these materials through jsdelivr.

This means that according to our design, avatar images in the production environment should always be served through jsdelivr.
