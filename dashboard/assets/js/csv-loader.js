async function cargarCSV(url) {
  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      console.warn(`No se pudo cargar el archivo: ${url}`);
      return { etiquetas: ["sin datos"], valores: [0] };
    }

    const texto = await respuesta.text();

    if (!texto || texto.trim().length === 0) {
      return { etiquetas: ["sin datos"], valores: [0] };
    }

    const lineas = texto.trim().split("\n");

    if (lineas.length < 2) {
      return { etiquetas: ["sin datos"], valores: [0] };
    }

    const etiquetas = [];
    const valores = [];

    for (let i = 1; i < lineas.length; i++) {
      const columnas = lineas[i].split(",");

      if (columnas.length < 2) continue;

      etiquetas.push(columnas[0] || "sin datos");
      const valor = parseFloat(columnas[1]);
      valores.push(isNaN(valor) ? 0 : valor);
    }

    return etiquetas.length
      ? { etiquetas, valores }
      : { etiquetas: ["sin datos"], valores: [0] };
  } catch (error) {
    console.error("Error CSV:", error);
    return { etiquetas: ["sin datos"], valores: [0] };
  }
}
