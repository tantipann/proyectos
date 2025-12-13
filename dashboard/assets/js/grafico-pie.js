async function crearGraficoPie() {
  const datos = await cargarCSV("/assets/data/datos2.csv");
  const id = "graficoPieNivel1";
  const ctx = document.getElementById(id).getContext("2d");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: datos.etiquetas,
      datasets: [
        {
          label: "Porcentaje",
          data: datos.valores,
          backgroundColor: [
            "rgba(220, 20, 60, 0.8)",
            "rgba(0, 0, 0, 0.8)",
            "rgba(255, 200, 0, 0.8)",
            "rgba(139, 0, 0, 0.8)",
            "rgba(150, 75, 00, 0.8)",
            "rgba(255, 140, 0, 0.8)",
            "rgba(71, 78, 81, 0.8)",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
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
            crearGraficoModal(id, label, "bar");
          },
          { once: true }
        );
      },
    },
  });
}
