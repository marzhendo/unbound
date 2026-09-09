import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

