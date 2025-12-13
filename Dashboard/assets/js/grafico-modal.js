let graficoModal = null;

async function crearGraficoModal(origen, label, tipo) {
  const archivo = `/assets/data/${origen}/${label}.csv`;
  const datos = await cargarCSV(archivo);

  const canvas = document.getElementById("modal-canvas");
  const ctx = canvas.getContext("2d");

  if (graficoModal) graficoModal.destroy();

  graficoModal = new Chart(ctx, {
    type: tipo,
    data: {
      labels: datos.etiquetas,
      datasets: [
        {
          label: "Detalle",
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
          borderColor: "rgba(255,255,255,1)",
          borderWidth: 2,
        },
      ],
    },
    options: tipo === "bar" ? { scales: { y: { beginAtZero: true } } } : {},
  });
}
