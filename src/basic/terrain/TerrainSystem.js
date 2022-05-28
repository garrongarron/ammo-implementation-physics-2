import { NoiseGenerator } from "./NoiseGenerator.js"

const noiseGenerator = new NoiseGenerator()
const v2 = new THREE.Vector2()
let terrainSystem = {
    'config1': {
        noiseType: 'perlin',
        scale: 100,
        octaves: 1,
        persistence: .22,
        lacunarity: 4.9,//6.9,
        exponentiation: 5.8,
        seed: 1,
        height: 150
    },
    'config2': {
        noiseType: 'perlin',
        scale: 1,
        octaves: 1,
        persistence: 1,
        lacunarity: 1,//6.9,
        exponentiation: 1,
        seed: 1,
        height: 1,
        finalHeight: 1,
        displacementX: 1,
        displacementZ: 1
    },
    filters: function (x, y, out) {
        let radio = v2.set(x, y).length()
        const rango = 30
        const radioMaximo = 150
        const target = -2
        if (radio > radioMaximo) {
            if (radio > radioMaximo + rango) return target
            return THREE.MathUtils.lerp(out, target, (radio - radioMaximo) / rango)
        }
        return out
    },
    'customNoiseGenerator': function (x, y) {
        let out = noiseGenerator.perlin2d(x, y) + noiseGenerator.perlin2d(
            x + this.config2.displacementX,
            y + this.config2.displacementZ,
            this.config2
        ) * this.config2.finalHeight * 0
        if (this.filters) {
            out = this.filters(x, y, out)
        }
        return out
    }
}
noiseGenerator.params = terrainSystem.config1
// window.terrainSystem = terrainSystem

export default terrainSystem