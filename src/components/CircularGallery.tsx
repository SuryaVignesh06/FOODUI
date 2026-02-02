// @ts-nocheck
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1: number, p2: number, t: number) {
    return p1 + (p2 - p1) * t;
}

function createTextTexture(gl: any, text: string, font = 'bold 30px monospace', color = 'black') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = font;
    const metrics = context.measureText(text);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
    canvas.width = textWidth + 20;
    canvas.height = textHeight + 20;
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new Texture(gl, { generateMipmaps: false });
    texture.image = canvas;
    return { texture, width: canvas.width, height: canvas.height };
}

class Title {
    gl: any;
    plane: any;
    renderer: any;
    text: string;
    textColor: string;
    font: string;
    mesh: any;

    constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: any) {
        this.gl = gl;
        this.plane = plane;
        this.renderer = renderer;
        this.text = text;
        this.textColor = textColor;
        this.font = font;
        this.createMesh();
    }

    createMesh() {
        const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
        const geometry = new Plane(this.gl);
        const program = new Program(this.gl, {
            vertex: `
                attribute vec3 position;
                attribute vec2 uv;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragment: `
                precision highp float;
                uniform sampler2D tMap;
                varying vec2 vUv;
                void main() {
                    vec4 color = texture2D(tMap, vUv);
                    if (color.a < 0.1) discard;
                    gl_FragColor = color;
                }
            `,
            uniforms: { tMap: { value: texture } },
            transparent: true
        });
        this.mesh = new Mesh(this.gl, { geometry, program });
        const aspect = width / height;
        const textHeight = this.plane.scale.y * 0.15;
        const textWidth = textHeight * aspect;
        this.mesh.scale.set(textWidth, textHeight, 1);
        this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
        this.mesh.setParent(this.plane);
    }
}

class Media {
    extra = 0;
    geometry: any;
    gl: any;
    image: string;
    index: number;
    length: number;
    renderer: any;
    scene: any;
    screen: any;
    text: string;
    viewport: any;
    bend: number;
    textColor: string;
    borderRadius: number;
    font: string;
    program: any;
    plane: any;
    title: any;
    scale: number = 1;
    padding: number = 0;
    width: number = 0;
    widthTotal: number = 0;
    x: number = 0;
    speed: number = 0;
    isBefore: boolean = false;
    isAfter: boolean = false;

    constructor(opts: any) {
        Object.assign(this, opts);
        this.createShader();
        this.createMesh();
        this.createTitle();
        this.onResize();
    }

    createShader() {
        const texture = new Texture(this.gl, { generateMipmaps: true });
        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
                precision highp float;
                attribute vec3 position;
                attribute vec2 uv;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                uniform float uTime;
                uniform float uSpeed;
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    vec3 p = position;
                    p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
                }
            `,
            fragment: `
                precision highp float;
                uniform vec2 uImageSizes;
                uniform vec2 uPlaneSizes;
                uniform sampler2D tMap;
                uniform float uBorderRadius;
                varying vec2 vUv;
                
                float roundedBoxSDF(vec2 p, vec2 b, float r) {
                    vec2 d = abs(p) - b;
                    return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
                }
                
                void main() {
                    vec2 ratio = vec2(
                        min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
                        min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
                    );
                    vec2 uv = vec2(
                        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
                        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
                    );
                    vec4 color = texture2D(tMap, uv);
                    float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
                    float edgeSmooth = 0.002;
                    float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
                    gl_FragColor = vec4(color.rgb, alpha);
                }
            `,
            uniforms: {
                tMap: { value: texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uSpeed: { value: 0 },
                uTime: { value: 100 * Math.random() },
                uBorderRadius: { value: this.borderRadius }
            },
            transparent: true
        });

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.image;
        img.onload = () => {
            texture.image = img;
            this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
        };
    }

    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        this.plane.setParent(this.scene);
    }

    createTitle() {
        this.title = new Title({
            gl: this.gl,
            plane: this.plane,
            renderer: this.renderer,
            text: this.text,
            textColor: this.textColor,
            font: this.font
        });
    }

    update(scroll: any, direction: string) {
        this.plane.position.x = this.x - scroll.current - this.extra;
        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const B_abs = Math.abs(this.bend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);
            const effectiveX = Math.min(Math.abs(x), H);
            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);

            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;
        this.program.uniforms.uTime.value += 0.04;
        this.program.uniforms.uSpeed.value = this.speed;

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

        if (direction === 'right' && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
        if (direction === 'left' && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
    }

    onResize({ screen, viewport }: any = {}) {
        if (screen) this.screen = screen;
        if (viewport) this.viewport = viewport;

        this.scale = this.screen.height / 1500;
        this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
        this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
        this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
        this.padding = 2;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }
}

class GalleryApp {
    container: HTMLElement;
    scrollSpeed: number;
    scroll: { ease: number; current: number; target: number; last: number; position?: number };
    onCheckDebounce: Function;
    renderer: any;
    gl: any;
    camera: any;
    scene: any;
    planeGeometry: any;
    mediasImages: any[];
    medias: Media[];
    screen: { width: number; height: number };
    viewport: { width: number; height: number };
    raf: number = 0;
    isDown: boolean = false;
    start: number = 0;
    boundOnResize: any;
    boundOnWheel: any;
    boundOnTouchDown: any;
    boundOnTouchMove: any;
    boundOnTouchUp: any;

    constructor(container: HTMLElement, opts: any = {}) {
        this.container = container;
        this.scrollSpeed = opts.scrollSpeed || 2;
        this.scroll = { ease: opts.scrollEase || 0.05, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        this.screen = { width: 0, height: 0 };
        this.viewport = { width: 0, height: 0 };
        this.mediasImages = [];
        this.medias = [];

        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(opts.items, opts.bend, opts.textColor, opts.borderRadius, opts.font);
        this.update();
        this.addEventListeners();
    }

    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.gl.canvas);
    }

    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }

    createScene() {
        this.scene = new Transform();
    }

    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
        });
    }

    createMedias(items: any[], bend = 3, textColor = '#ffffff', borderRadius = 0, font = 'bold 30px Bebas Neue') {
        const galleryItems = items && items.length ? items : [];
        this.mediasImages = galleryItems.concat(galleryItems);
        this.medias = this.mediasImages.map((data, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                image: data.image,
                index,
                length: this.mediasImages.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                text: data.text,
                viewport: this.viewport,
                bend,
                textColor,
                borderRadius,
                font
            });
        });
    }

    onTouchDown(e: MouseEvent | TouchEvent) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
    }

    onTouchMove(e: MouseEvent | TouchEvent) {
        if (!this.isDown) return;
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = (this.scroll.position || 0) + distance;
    }

    onTouchUp() {
        this.isDown = false;
        this.onCheck();
    }

    onWheel(e: WheelEvent) {
        const delta = e.deltaY;
        this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
        this.onCheckDebounce();
    }

    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }

    onResize() {
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height
        });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }

    update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }

    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);

        window.addEventListener('resize', this.boundOnResize);
        this.container.addEventListener('wheel', this.boundOnWheel);
        this.container.addEventListener('mousedown', this.boundOnTouchDown);
        this.container.addEventListener('mousemove', this.boundOnTouchMove);
        this.container.addEventListener('mouseup', this.boundOnTouchUp);
        this.container.addEventListener('touchstart', this.boundOnTouchDown);
        this.container.addEventListener('touchmove', this.boundOnTouchMove);
        this.container.addEventListener('touchend', this.boundOnTouchUp);
    }

    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.boundOnResize);
        this.container.removeEventListener('wheel', this.boundOnWheel);
        this.container.removeEventListener('mousedown', this.boundOnTouchDown);
        this.container.removeEventListener('mousemove', this.boundOnTouchMove);
        this.container.removeEventListener('mouseup', this.boundOnTouchUp);
        this.container.removeEventListener('touchstart', this.boundOnTouchDown);
        this.container.removeEventListener('touchmove', this.boundOnTouchMove);
        this.container.removeEventListener('touchend', this.boundOnTouchUp);
        if (this.renderer?.gl?.canvas?.parentNode) {
            this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
        }
    }
}

interface CircularGalleryProps {
    items?: { image: string; text: string }[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
}

export default function CircularGallery({
    items,
    bend = 3,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = 'bold 30px Bebas Neue',
    scrollSpeed = 2,
    scrollEase = 0.05
}: CircularGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const app = new GalleryApp(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });
        return () => {
            app.destroy();
        };
    }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

    return <div className="circular-gallery" ref={containerRef} />;
}
