/* eslint-disable */
import { init as initA } from './a';
import { init as initB } from './b';
import { init as initC } from './c';
import { Sphere } from './d';
import { Cube as Cube1 } from './e';
import { Cube as Cube2 } from './f';
import { Elf } from './g';

import './styles.sass';

init();

function init() {
  const linkA = document.getElementById('a-link');
  const linkB = document.getElementById('b-link');
  const linkC = document.getElementById('c-link');
  const linkD = document.getElementById('d-link');
  const linkE = document.getElementById('e-link');
  const linkF = document.getElementById('f-link');
  const linkG = document.getElementById('g-link');

  linkA.addEventListener("click", () => onExampleLinkClick((section) => initA(section)));
  linkB.addEventListener("click", () => onExampleLinkClick((section) => initB(section)));
  linkC.addEventListener("click", () => onExampleLinkClick((section) => initC(section)));
  linkD.addEventListener("click", () => onExampleLinkClick((section) => new Sphere(section)));
  linkE.addEventListener("click", () => onExampleLinkClick((section) => new Cube1(section)));
  linkF.addEventListener("click", () => onExampleLinkClick((section) => new Cube2(section)));
  linkG.addEventListener("click", () => onExampleLinkClick((section) => new Elf(section)));

  onExampleLinkClick((section) => new Cube1(section));
}

function onExampleLinkClick(initFn) {
  const section = document.getElementById('drawing-section');
  section.innerHTML = '';

  initFn(section);
}
