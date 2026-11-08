**Explica 5 de las 10 heurísticas de Nielsen con un ejemplo:**
1. **Visibilidad del estado del sistema:** la web debe informar qué está pasando. Ejemplo:  Al registrar una alerta aparece el aviso verde "Alerta guardada correctamente".
2. **Coincidencia con el mundo real:** usar el lenguaje de quien usa la web. Ejemplo: Los estados se ven como "En revisión" y "Cerrada", no como códigos.
3. **Control y libertad del usuario:** Ejemplo: Permitir modificar el estado de una alerta o cambiar los filtros de búsqueda cuando sea necesario.
4. **Consistencia y estándares:** lo parecido debe funcionar igual. Ejemplo: El menú y los colores de severidad son los mismos en las tres páginas.
5. **Prevención de errores:** evitar el error antes de que ocurra. ejemplo: Eliminar pide confirmación y Exportar JSON se desactiva cuando no hay alertas.

**Cómo se vincula un error con su campo y por qué no basta el color:**
Los mensajes de error deben mostrarse cerca del campo que contiene el problema y explicar claramente qué debe corregirse. No basta utilizar únicamente colores porque algunas personas pueden tener dificultades para distinguirlos o utilizar tecnologías asistivas. Por ello, el mensaje debe incluir texto descriptivo además de cualquier indicador visual.

**Qué valida el cliente y qué debe validar el servidor:**
El cliente valida aspectos básicos como campos vacíos, formatos de correo, longitudes mínimas y reglas de ingreso para mejorar la experiencia del usuario. Sin embargo, el servidor debe validar nuevamente toda la información recibida, ya que los datos enviados desde el navegador pueden ser modificados o manipulados antes de llegar al sistema.

**Fuentes:**
Nielsen, J. (1994). Enhancing the explanatory power of usability heuristics. En *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '94)* (pp. 152-158). ACM.

Nielsen Norman Group. (s. f.). *10 usability heuristics for user interface design*. https://www.nngroup.com/

W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/

Dudas:
 ¿Cómo se puede garantizar que los mensajes de error sean accesibles para usuarios que utilizan lectores de pantalla y otras tecnologías asistivas?