import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

import './SmokeShader.css';

interface SmokeShaderProps {
    baseColor?: number[];
    speed?: number;
    amplitude?: number;
    density?: number;
    opacity?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const SmokeShader = ({
    baseColor = [1.0, 1.0, 1.0],
    speed = 0.15,
    amplitude = 0.4,
    density = 2.5,
    opacity = 0.6,
    className = '',
    style = {},
    ...props
}: SmokeShaderProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const renderer = new Renderer({ alpha: true, antialias: true });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uDensity;
      uniform float uOpacity;
      varying vec2 vUv;

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Fractal Brownian Motion for realistic smoke
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 6; i++) {
          value += amplitude * snoise(p * frequency);
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        
        // Create rising smoke effect
        float time = uTime;
        
        // Offset UV for rising effect
        vec2 smokeUv = uv;
        smokeUv.y -= time * 0.3; // Rising motion
        
        // Multiple layers of noise for organic smoke
        float noise1 = fbm(smokeUv * uDensity + vec2(time * 0.1, 0.0));
        float noise2 = fbm(smokeUv * uDensity * 1.5 + vec2(-time * 0.15, time * 0.05));
        float noise3 = fbm(smokeUv * uDensity * 0.8 + vec2(time * 0.08, -time * 0.1));
        
        // Combine noise layers
        float smoke = (noise1 + noise2 * 0.7 + noise3 * 0.5) / 2.2;
        
        // Add swirling motion
        float swirl = sin(uv.y * 10.0 + time + noise1 * uAmplitude * 3.0) * 0.1;
        smoke += swirl;
        
        // Fade at edges for natural look
        float edgeFade = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
        float sideFade = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x);
        
        // Create wispy strands
        float strands = pow(abs(smoke), 0.8);
        strands = smoothstep(0.1, 0.9, strands);
        
        // Final smoke intensity
        float intensity = strands * edgeFade * sideFade * uOpacity;
        
        // Apply color with transparency
        vec3 color = uBaseColor * intensity;
        float alpha = intensity * 0.85;
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uResolution: {
                    value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
                },
                uBaseColor: { value: new Float32Array(baseColor) },
                uAmplitude: { value: amplitude },
                uDensity: { value: density },
                uOpacity: { value: opacity }
            }
        });
        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            const scale = 1;
            renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);
            const resUniform = program.uniforms.uResolution.value as Float32Array;
            resUniform[0] = gl.canvas.width;
            resUniform[1] = gl.canvas.height;
            resUniform[2] = gl.canvas.width / gl.canvas.height;
        }
        window.addEventListener('resize', resize);
        resize();

        let animationId: number;
        function update(t: number) {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001 * speed;
            renderer.render({ scene: mesh });
        }
        animationId = requestAnimationFrame(update);

        container.appendChild(gl.canvas);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            if (gl.canvas.parentElement) {
                gl.canvas.parentElement.removeChild(gl.canvas);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [baseColor, speed, amplitude, density, opacity]);

    return <div ref={containerRef} className={`smoke-shader-container ${className}`} style={style} {...props} />;
};

export default SmokeShader;
