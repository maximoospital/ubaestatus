# [UbaEstatus](https://cumplanlaley27795.info)

Una landing page construida con **Astro** para visibilizar la situación actual de la UBA y su paro.

El proyecto comparte info resumida, links relevantes y herramientas de acción frente a la crisis presupuestaria.

---

## Características Principales

- **Bento Grid Interactivo**: Una grilla de información con múltiples tipos de tarjetas (estadísticas, citas, gráficos de barras, listas) que detallan el impacto del ajuste.
- **Calendario de Eventos Dinámico**: Integración con la API de "Cartelera de Inexactas" para mostrar actividades, clases públicas y jornadas de lucha en tiempo real.
- **Contador en Tiempo Real**: Un reloj (Flipclock.js) que muestra el tiempo transcurrido desde el inicio de la medida.
- **Sección de Acción Directa**: Directorio de perfiles y contactos políticos para fomentar la incidencia y el reclamo.
- **Agregados de UX**:
  - Scroll suave mediante [Lenis](https://lenis.darkroom.engineering/).
  - Animaciones con [Motion](https://motion.dev/).
  - Diseño responsivo usando [Tailwind CSS 4.0](https://tailwindcss.com/).

## Stack

- **Framework**: [Astro](https://astro.build/) (SSG)
- **Estilos**: Tailwind CSS 4.0
- **Lógica Frontend**: [Alpine.js](https://alpinejs.dev/)
- **Interactividad**: [Swiper](https://swiperjs.com/) (Carousel de Calendario), [Flipclock.js](https://github.com/pqina/flipclock).
- **Smooth Scroll**: Lenis.
- **Iconos**: Astro Icon (Iconify).

## Desarrollo Local

Al ser un proyecto open source y un reclamo de la comunidad, invito a que cualquiera que quiera aportar más info, o mejorar aspectos del sitio, lo haga. 

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/maximoospital/ubaestatus.git
    cd ubaestatus
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```

## # Agradecimientos

Agradecemos a los siguientes proyectos y personas por la información y herramientas compartidas:

- **[Cartelera de Inexactas](https://cartelera.inexactas.ar/)**: Por su API abierta de eventos universitarios.
- **[Dr. Rodrigo Quiroga](https://github.com/rquiroga7)**: Por su exhaustiva recopilación de datos sobre salarios y presupuesto ([salarios_CONICET](https://github.com/rquiroga7/salarios_CONICET) y [presupuesto_Universitario](https://github.com/rquiroga7/presupuesto_Universitario)).
- **[Dr. Jorge Aliaga](https://jorgealiaga.com.ar/)**: Por sus análisis presupuestarios críticos y gráficas esenciales para entender la situación.
