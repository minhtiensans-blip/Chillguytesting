document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Di chuyển tối đa 15px
        btn.style.transform = `
            translate(${x * 0.25}px, ${y * 0.25}px)
            scale(1.08)
        `;
    });

    btn.addEventListener("mouseleave", () => {
        // Pop về vị trí cũ
        btn.style.transition = "transform .35s cubic-bezier(.2,1.5,.5,1)";
        btn.style.transform = "translate(0,0) scale(1)";
    });

    btn.addEventListener("mouseenter", () => {
        btn.style.transition = "transform .15s ease";
    });
});