import React, { useEffect, useRef } from "react";

/**
 * Phosphor — a glowing shell of twisted noise, marched in one fragment shader.
 * Port of "Phosphor" by Xor, customized for Ciclos with pure alpha transparency,
 * adaptive mobile GPU scaling, and battery-friendly viewport pauses.
 */

const MAX_DPR = 1;
const REF_RADIUS = 3;
const REF_EXPOSURE = 3e4;
const TIME_RATE = 1;
const TAU = 6.283185307179586;

function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function num(v, fallback) {
  return typeof v === "number" && isFinite(v) ? v : fallback;
}

function hueToRgb(p, q, t) {
  let x = t;
  if (x < 0) x += 1;
  if (x > 1) x -= 1;
  if (x < 1 / 6) return p + (q - p) * 6 * x;
  if (x < 1 / 2) return q;
  if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6;
  return p;
}

function parseColor(input, fallback) {
  if (!input) return fallback;
  let s = String(input).trim();
  if (s.startsWith("var(")) {
    const comma = s.indexOf(",");
    if (comma < 0) return fallback;
    s = s.slice(comma + 1, s.lastIndexOf(")")).trim();
  }
  if (s[0] === "#") {
    const hex = s.slice(1);
    const full =
      hex.length === 3 || hex.length === 4
        ? hex
            .slice(0, 3)
            .split("")
            .map((c) => c + c)
            .join("")
        : hex.slice(0, 6);
    const n = parseInt(full, 16);
    if (!isFinite(n)) return fallback;
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const m = s.match(/^(rgba?|hsla?)\s*\(([^)]+)\)$/i);
  if (!m) return fallback;
  const parts = m[2].split(/[,\s/]+/).filter((p) => p.length > 0);
  if (parts.length < 3) return fallback;
  if (m[1].toLowerCase().startsWith("rgb")) {
    const raw = [parseFloat(parts[0]), parseFloat(parts[1]), parseFloat(parts[2])];
    if (!raw.every((v) => isFinite(v))) return fallback;
    const scale = (text, v) => (text.indexOf("%") >= 0 ? v / 100 : v / 255);
    return [
      clamp01(scale(parts[0], raw[0])),
      clamp01(scale(parts[1], raw[1])),
      clamp01(scale(parts[2], raw[2])),
    ];
  }
  const h = (((parseFloat(parts[0]) % 360) + 360) % 360) / 360;
  const sat = clamp01(parseFloat(parts[1]) / 100);
  const li = clamp01(parseFloat(parts[2]) / 100);
  if (!isFinite(h) || !isFinite(sat) || !isFinite(li)) return fallback;
  if (sat === 0) return [li, li, li];
  const q = li < 0.5 ? li * (1 + sat) : li + sat - li * sat;
  const p = 2 * li - q;
  return [hueToRgb(p, q, h + 1 / 3), hueToRgb(p, q, h), hueToRgb(p, q, h - 1 / 3)];
}

const VERT_SRC = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG_SRC_BODY = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;

uniform vec3  uBg;
uniform vec3  uBase;
uniform float uSpread;    // hue spread; 1.0 is rainbow, 0.0 mono
uniform float uRadius;    // shell radius, world units
uniform float uDist;      // camera distance to the shell centre
uniform float uTurb;      // octave gain
uniform float uGain;      // 1 / exposure divisor

vec3 tanh3(vec3 x) {
    vec3 e = exp(-2.0 * abs(x));
    return sign(x) * (1.0 - e) / (1.0 + e);
}

void main() {
    vec3 dir = normalize(vec3(2.0 * gl_FragCoord.xy - uRes, 1.0 - uRes.y));

    vec3 acc = vec3(0.0);
    float z = 0.0;
    float d = 0.0;
    float s = 0.0;

    for (int i = 0; i < STEPS; i++) {
        vec3 p = z * dir;
        vec3 a = normalize(cos(vec3(1.0, 2.0, 0.0) + uTime - d * 8.0));
        p.z += uDist;
        a = a * dot(a, p) - cross(a, p);

        for (float k = 2.0; k < TURB_MAX; k += 1.0) {
            a += uTurb * sin(a * k + uTime).yzx / k;
        }

        s = a.y;
        d = max(1e-6, 0.1 * abs(length(p) - uRadius) + 0.04 * abs(s));
        z += d;
        acc += (cos(s + vec3(0.0, 1.0, 2.0) * uSpread) + 1.0) / d * z;
    }

    // Distance from center of canvas (-1 to 1)
    vec2 uv = (2.0 * gl_FragCoord.xy - uRes) / min(uRes.x, uRes.y);
    float dist = length(uv);

    // Smooth radial falloff so there is ZERO background glow outside the ball
    float vignette = smoothstep(1.0, 0.5, dist);

    vec3 glow = tanh3(acc * uBase * uGain);

    // Subtract baseline ambient accumulation to keep background pitch black
    glow = max(vec3(0.0), glow - vec3(0.038));
    glow *= vignette;

    // Alpha transparency: only the glowing ball is visible
    float alpha = clamp(max(max(glow.r, glow.g), glow.b) * 2.2, 0.0, 1.0);

    gl_FragColor = vec4(glow, alpha);
}
`;

function compileShader(gl, type, src) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Phosphor shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function Phosphor({
  background = "transparent",
  baseColor = "#00f2fe",
  spectrum = 18,
  size = 145,
  distance = 7.5,
  turbulence = 48,
  brightness = 160,
  speed = 32,
  className = "",
  style = {},
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef({
    background,
    baseColor,
    spectrum,
    size,
    distance,
    turbulence,
    brightness,
    speed,
  });

  useEffect(() => {
    propsRef.current = {
      background,
      baseColor,
      spectrum,
      size,
      distance,
      turbulence,
      brightness,
      speed,
    };
  });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    let gl = null;
    let program = null;
    let vs = null;
    let fs = null;
    let buffer = null;
    let raf = 0;
    let isVisible = true;

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
          navigator.userAgent
        ));

    // Otimização para celular: menos iterações no loop mantendo 60fps cravados
    const shaderHeader = isMobile
      ? "#define STEPS 44\n#define TURB_MAX 6.0\n"
      : "#define STEPS 80\n#define TURB_MAX 10.0\n";
    const fragSource = shaderHeader + FRAG_SRC_BODY;

    function initGL() {
      gl = canvas.getContext("webgl", {
        antialias: false,
        alpha: true,
        depth: false,
        preserveDrawingBuffer: false,
        powerPreference: "low-power",
      });
      if (!gl) {
        console.warn("Phosphor: WebGL unavailable");
        return false;
      }

      vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
      fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSource);
      if (!vs || !fs) return false;

      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Phosphor link:", gl.getProgramInfoLog(program));
        return false;
      }
      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );
      const posLoc = gl.getAttribLocation(program, "aPos");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      return true;
    }

    if (!initGL()) return;

    const loc = (name) => gl.getUniformLocation(program, name);
    const uRes = loc("uRes");
    const uTime = loc("uTime");
    const uBg = loc("uBg");
    const uBase = loc("uBase");
    const uSpread = loc("uSpread");
    const uRadius = loc("uRadius");
    const uDist = loc("uDist");
    const uTurb = loc("uTurb");
    const uGain = loc("uGain");

    let cssWidth = root.offsetWidth || 1;
    let cssHeight = root.offsetHeight || 1;
    const resizeObserver = new ResizeObserver(() => {
      cssWidth = root.offsetWidth || 1;
      cssHeight = root.offsetHeight || 1;
    });
    resizeObserver.observe(root);

    // Pausa animação quando sair da tela para poupar 100% da bateria no celular
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });
    intersectionObserver.observe(root);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let last = performance.now();
    let clock = 0;

    const render = (now) => {
      if (!isVisible || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(render);

      const dt = clamp((now - last) / 1000, 0, 0.05);
      last = now;

      const p = propsRef.current;
      const still = reduceMotion ? 0 : 1;
      const rate = (clamp(num(p.speed, 50), 0, 100) / 50) * TIME_RATE;
      clock = (clock + dt * still * rate) % TAU;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const bufferWidth = Math.max(1, Math.round(cssWidth * dpr));
      const bufferHeight = Math.max(1, Math.round(cssHeight * dpr));
      if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;
        gl.viewport(0, 0, bufferWidth, bufferHeight);
      }

      const bg = parseColor(p.background, [0.0, 0.0, 0.0]);
      const base = parseColor(p.baseColor, [0, 0.95, 1]);

      gl.uniform2f(uRes, bufferWidth, bufferHeight);
      gl.uniform1f(uTime, clock);
      gl.uniform3f(uBg, bg[0], bg[1], bg[2]);
      gl.uniform3f(uBase, base[0], base[1], base[2]);
      gl.uniform1f(uSpread, clamp(num(p.spectrum, 100), 0, 100) / 100);
      gl.uniform1f(uRadius, (clamp(num(p.size, 100), 20, 200) / 100) * REF_RADIUS);
      gl.uniform1f(uDist, clamp(num(p.distance, 5), 2, 20));
      gl.uniform1f(uTurb, clamp(num(p.turbulence, 100), 0, 200) / 100);
      gl.uniform1f(uGain, clamp(num(p.brightness, 100), 10, 400) / 100 / REF_EXPOSURE);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    raf = requestAnimationFrame(render);

    const onVisibilityChange = () => {
      if (!document.hidden && isVisible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onContextLost = (e) => {
      e.preventDefault();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onContextRestored = () => {
      initGL();
      last = performance.now();
      raf = requestAnimationFrame(render);
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden w-full h-full bg-transparent ${className}`}
      style={{
        background: "transparent",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block bg-transparent"
      />
    </div>
  );
}
