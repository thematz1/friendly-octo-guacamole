(function () {
  function hasWebGL() {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  }
  if (!hasWebGL() || typeof THREE === 'undefined') return;

  function createParticleScene(container, options) {
    var opts = Object.assign({ particleCount: 200, speed: 0.0005, color: 0xC9A96E, size: 2, mouseInfluence: 0.5 }, options);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 300;
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.setAttribute('role', 'presentation');
    container.style.position = 'relative';
    container.classList.add('has-particles');
    container.insertBefore(renderer.domElement, container.firstChild);

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(opts.particleCount * 3);
    var velocities = [];
    for (var i = 0; i < opts.particleCount; i++) {
      positions[i*3] = (Math.random()-0.5)*600; positions[i*3+1] = (Math.random()-0.5)*600; positions[i*3+2] = (Math.random()-0.5)*300;
      velocities.push({ x:(Math.random()-0.5)*opts.speed*2, y:(Math.random()-0.5)*opts.speed*2, z:(Math.random()-0.5)*opts.speed });
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    var material = new THREE.PointsMaterial({ color: opts.color, size: opts.size, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    var points = new THREE.Points(geometry, material);
    scene.add(points);

    var mouseX = 0, mouseY = 0;
    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    var animId = null;
    var isReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isReducedMotion) {
        var pos = geometry.attributes.position.array;
        for (var i = 0; i < opts.particleCount; i++) {
          pos[i*3] += velocities[i].x; pos[i*3+1] += velocities[i].y; pos[i*3+2] += velocities[i].z;
          if (pos[i*3] > 300) pos[i*3] = -300; if (pos[i*3] < -300) pos[i*3] = 300;
          if (pos[i*3+1] > 300) pos[i*3+1] = -300; if (pos[i*3+1] < -300) pos[i*3+1] = 300;
        }
        geometry.attributes.position.needsUpdate = true;
      }
      camera.position.x += (mouseX * 30 * opts.mouseInfluence - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 30 * opts.mouseInfluence - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    return {
      dispose: function () {
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        geometry.dispose(); material.dispose(); renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        container.classList.remove('has-particles');
      }
    };
  }

  var scenes = [];
  function init() {
    scenes.forEach(function (s) { s.dispose(); }); scenes = [];
    var hero = document.querySelector('.hero');
    if (hero) scenes.push(createParticleScene(hero, { particleCount: 200, speed: 0.0005 }));
    var branding = document.querySelector('.login-branding');
    if (branding) {
      var count = window.innerWidth < 768 ? 50 : 100;
      scenes.push(createParticleScene(branding, { particleCount: count, speed: 0.0003 }));
    }
  }

  document.addEventListener('DOMContentLoaded', init);
  window.LuxeParticles = {
    reinit: init,
    dispose: function () { scenes.forEach(function (s) { s.dispose(); }); scenes = []; }
  };
})();
