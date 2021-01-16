
import { makeWave, makeSea, shakeSea } from './sea';
import { makeStepper } from './stepper';

const wave = makeWave(x => Math.sin(x * 50) * 200);
const stepper = makeStepper(0.001);
let sea = makeSea(230);

const container = document.getElementById('wave');

const column = (height) => {
  const el = document.createElement('div')
  el.classList.add('column');

  el.style.height = `${Math.abs(height)}px`;

  if (height < 0) {
    el.style.transform = `translateY(-100%)`;
  }

  return el;
}


const render = (sea) => {
  container.innerHTML = '';
  sea.forEach((s) => {
    container.appendChild(column(s));
  });
}

const start = () => {
  sea = shakeSea(sea)(wave(stepper()));

  render(sea);

  setTimeout(() => {
    window.requestAnimationFrame(start);
  }, 50);
}

start();


