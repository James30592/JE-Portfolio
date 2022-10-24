// import { toggleClass } from "./utils.js";



initBpAnims();
drawLayoutLinesOnLoad();
fadeInElemsOnLoad();




function initBpAnims() {
  const bps = Array.from(document.querySelectorAll(".lined-bullet-point"));
  const bpsWithLines = getBpsWithLines(bps);
  addBpBtnEventListeners(bpsWithLines);
}

// Get bullet points and their associated elements to be animated as objects.
function getBpsWithLines(bps) {
  const bpsWithLines = bps.map(bp => {
    const bpLine = bp.querySelector(".bp-layout-line");
    const collapseTargetId = bp.getAttribute("data-bs-target");
    const collapseDiv = document.querySelector(collapseTargetId);
  
    return {
      bp: bp,
      line: bpLine,
      collapseDiv: collapseDiv,
      midTrans: false
    };
  });

  return bpsWithLines
}

// Add event listeners to buttons with bullet points, to animate bullet point.
function addBpBtnEventListeners(bpsWithLines) {
  bpsWithLines.forEach(bpWithLine => {
    bpWithLine.bp.addEventListener("click", () => {
      if (!bpWithLine.midTrans) {
        toggleClass(bpWithLine.line, "activated-bp-layout-line");
        bpWithLine.midTrans = true;
  
        // Only allow one animation per collapse div transition.
        bpWithLine.collapseDiv.addEventListener("transitionend", () => {
          bpWithLine.midTrans = false;
        });
      };
    });
  });
}





function drawLayoutLinesOnLoad() {
  const allLines = Array.from(document.querySelectorAll(".init-layout-line"));
  
  const maxDrawIdx = allLines.reduce((currMaxIdx, currLine) => {
    return Math.max(currLine.dataset.drawIdx, currMaxIdx);
  }, 0);

  window.addEventListener("load", () => drawLayoutLines(maxDrawIdx, allLines));
}

async function drawLayoutLines(maxDrawIdx, allLines) {
  for (let drawIdx = 0; drawIdx <= maxDrawIdx; drawIdx++) {
    const theseLines = allLines.filter(line => line.dataset.drawIdx == drawIdx);

    let theseLinesDrawn = new Promise(res => res());

    theseLines.forEach(line => {
      line.classList.remove("init-layout-line");
      theseLinesDrawn = awaitTransition(line);
    });

    await theseLinesDrawn;
    continue;
  };
}









const FADE_TIME_OFFSET = 100;

function fadeInElemsOnLoad() {
  const fadeLoadElems = Array.from(document.querySelectorAll(".fade-in-load"));
  window.addEventListener("load", () => fadeInElems(fadeLoadElems));
}

function fadeInElems(elems) {
  if (elems.length === 0) return;

  const currElem = elems.shift();

  currElem.classList.remove("fade-in-load");
  setTimeout(() => fadeInElems(elems), FADE_TIME_OFFSET);
}













// Returns a promise that resolves when transition on given element ends, 
// optional transition property name check.
function awaitTransition(elem, propName = null) {
  return new Promise(resolve => {
    elem.addEventListener("transitionend", async evt => {

      if (propName) {
        if (evt.propertyName === propName) {
          resolve();
        }

        else {
          await awaitTransition(elem, propName);
          resolve();
        };
      }

      else {
        resolve();
      };

    }, {once: true});
  })
}

function toggleClass(elem, clss) {
  if (elem.classList.contains(clss)) {
    elem.classList.remove(clss);
  }
  else {
    elem.classList.add(clss);
  };
}















// To run page specific JS.
var currPage = document.querySelector("body").dataset.scripts;



if (currPage === "contact") {
  const showEmailBtn = document.querySelector(".show-email-btn");
  const emailLink = document.querySelector(".email-address");

  // Keep email hidden from scrapers.
  const mailToParts = ["ma", "ilt", "o:"];
  const emlParts = ["james_ev", "erett", "@l", "ive.c", "om"];

  showEmailBtn.addEventListener("click", showEmail, {once: true});

  function showEmail() {
    const mailTo = mailToParts.join("");
    const emlAddress = emlParts.join("");

    emailLink.innerHTML = emlAddress;
    emailLink.setAttribute("href", mailTo + emlAddress);
  }
}