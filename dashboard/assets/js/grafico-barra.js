async function crearGraficoBarra() {
  const datos = await cargarCSV("assets/data/datos.csv");
  const id = "graficoBarraNivel1";
  const ctx = document.getElementById(id).getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: datos.etiquetas,
      datasets: [
        {
          label: "Unidades",
          data: datos.valores,
          backgroundColor: "rgba(255,215,0,0.8)",
          borderColor: "rgba(255,200,0,1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: { y: { beginAtZero: true } },
      onClick(event, elements) {
        if (!elements.length) return;

        let label = this.data.labels[elements[0].index]
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "-");

        document.getElementById("modal-titulo").textContent =
          `DETALLE DE ${label.toUpperCase()}`;

        const modalEl = document.getElementById("modal-grafico");
        const modal = new bootstrap.Modal(modalEl);
        modal.show();

        modalEl.addEventListener(
          "shown.bs.modal",
          () => {
            crearGraficoModal(id, label, "pie");
          },
          { once: true }
        );
      },
    },
  });
}
