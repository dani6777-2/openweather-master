/**
 * Reporta las métricas Web Vitals a la función de callback proporcionada
 * Métricas incluidas:
 * - CLS (Cumulative Layout Shift): Mide la estabilidad visual
 * - FID (First Input Delay): Mide la interactividad
 * - FCP (First Contentful Paint): Mide la velocidad de carga inicial
 * - LCP (Largest Contentful Paint): Mide la velocidad de carga percibida
 * - TTFB (Time to First Byte): Mide la respuesta del servidor
 * 
 * @param {Function} onPerfEntry - Función callback para recibir las métricas
 * @returns {void}
 */
const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      const webVitals = await import('web-vitals');
      const metrics = [
        webVitals.getCLS,
        webVitals.getFID,
        webVitals.getFCP,
        webVitals.getLCP,
        webVitals.getTTFB
      ];

      metrics.forEach(metric => {
        try {
          metric(onPerfEntry);
        } catch (error) {
          console.warn(`Error al medir ${metric.name}:`, error);
        }
      });
    } catch (error) {
      console.error('Error al cargar web-vitals:', error);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.warn(
      'reportWebVitals requiere una función callback válida para reportar las métricas de rendimiento.'
    );
  }
};

export default reportWebVitals;
