(function () {
  const card = document.getElementById("card");
  const hint = document.getElementById("copyHint");
  const copyButtons = document.querySelectorAll(".copy-btn[data-copy]");

  let hintTimer;

  function showHint(message) {
    hint.textContent = message;
    hint.classList.add("is-visible");
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () {
      hint.classList.remove("is-visible");
      hint.textContent = "";
    }, 2000);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showHint("클립보드에 복사했습니다.");
    } catch {
      showHint("복사에 실패했습니다.");
    }
  }

  copyButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      copyText(btn.getAttribute("data-copy"));
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && card) {
    let raf;
    card.addEventListener("mousemove", function (e) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const max = 5;
        card.style.transform =
          "perspective(900px) rotateY(" + x * max + "deg) rotateX(" + -y * max + "deg) scale(1.01)";
      });
    });
    card.addEventListener("mouseleave", function () {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = "";
    });
  }
})();
