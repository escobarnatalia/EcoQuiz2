const DescrTarea = document.getElementById('DescrTarea');
const AgregarBtn = document.getElementById('AgregarBtn');

const TareasContainerToDo = document.getElementById('TareasContainer');
const TareasContainerDoing = document.getElementById('TareasContainerDoing');
const TareasContainerDone = document.getElementById('TareasContainerDone');

const database = firebase.database();

const agregar = () => {

    if (DescrTarea.value === '') {
        alert('Debe agregar una tarea');
        return;
    }

    let referencia = database.ref('Tareas').push();
    let tareas = {
        id: referencia.key,
        DescripcionTarea: DescrTarea.value,
        estado: "toDoTarea",
    }
    referencia.set(tareas);
    //borrar tarea cuando se agrega 
    DescrTarea.value = '';
}

AgregarBtn.addEventListener('click', agregar);

//lectura
database.ref('Tareas').on('value', function (data) {
    TareasContainer.innerHTML = '';
    TareasContainerDoing.innerHTML = '';

    data.forEach(
        tareas => {
            let valor = tareas.val();
            let tareaClass = new Tareas(valor);

            if (tareas.val().estado === "toDoTarea") {
                TareasContainerToDo.appendChild(tareaClass.render());
            }

            if (tareas.val().estado === "DoingTarea") {
                TareasContainerDoing.appendChild(tareaClass.render());
            }

            if (tareas.val().estado === "DoneTarea") {
                TareasContainerDone.appendChild(tareaClass.render());
            }
        }
    )
})