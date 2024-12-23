const tareas = [
  { id: 1, descripcion: "Realizar lista", completada: true },
  { id: 2, descripcion: "Agregar pendientes a la lista", completada: true },
  { id: 3, descripcion: "Terminar de completar la lista", completada: false },
];
const botonAgregar = document.querySelector("#agregar");
let idAutoIncremental = tareas.length;

botonAgregar.addEventListener("click", () => {
  const input = document.getElementById("todo-input");
  const descripcion = input.value.trim();
  if (descripcion) {
    agregarTarea(descripcion);
    input.value = "";
  }
});

const generarIdentificador = () => {
  return (idAutoIncremental = idAutoIncremental + 1);
};

const agregarTarea = (descripcion) => {
  const nuevaTarea = {
    id: generarIdentificador(),
    descripcion,
    completada: false,
  };

  tareas.push(nuevaTarea);
  mostrarTareas();
};

const eliminarTarea = (id) => {
  const tarea = tareas.findIndex((tarea) => tarea.id === id);
  if (tarea !== -1) {
    tareas.splice(tarea, 1);
  }

  mostrarTareas();
};

const cambiarEstadoTarea = (id) => {
  const tarea = tareas.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
  }

  mostrarTareas();
};

const tareasTotales = () => {
  const total = document.getElementById("total");
  total.innerHTML = `Total: <b>${tareas.length}</b>`;
};

const tareasCompletadas = () => {
  const contador = tareas.filter((tarea) => tarea.completada).length;
  const realizadas = document.getElementById("realizadas");
  realizadas.innerHTML = `Realizadas: <b>${contador}</b>`;
};

const mostrarTareas = () => {
  const listaTareas = document.getElementById("todo-list");

  while (listaTareas.children.length > 1) {
    listaTareas.removeChild(listaTareas.lastChild);
  }

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center gap-3";
    li.innerHTML = `
            <div>
                <b>${tarea.id}</b>
            </div>
            <div class="${
              tarea.completada ? "text-decoration-line-through" : ""
            }">
                <b>${tarea.descripcion}
            </div>
            <div class="d-flex align-items-center gap-3">

<div class="form-check form-switch">
  <input class="form-check-input cursor" type="checkbox" ${
    tarea.completada ? "checked" : ""
  } onClick="cambiarEstadoTarea(${tarea.id})">
</div> 
            <i class="fa-solid fa-xmark text-danger cursor" onclick="eliminarTarea(${
              tarea.id
            })"></i>
            </div>
        `;

    listaTareas.appendChild(li);
  });

  tareasTotales();
  tareasCompletadas();
};

mostrarTareas();