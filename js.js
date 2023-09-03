$(document).ready(function () {
    $('#myModal').on('show.bs.modal', function () {
        console.log('El modal está comenzando a abrirse.');
        // Deshabilita el botón y cambia el color aquí
    });

    $('#myModal').on('shown.bs.modal', function () {
        console.log('El modal se ha abierto completamente.');
    });

    $('#myModal').on('hide.bs.modal', function () {
        console.log('El modal está comenzando a ocultarse.');
        // Reactiva el botón y restaura el color aquí
    });

    $('#myModal').on('hidden.bs.modal', function () {
        console.log('El modal se ha ocultado completamente.');
    });
});
$('#myModal').on('show.bs.modal', function () {
    $('#miBoton').prop('disabled', true);
    $('#miBoton').css('background-color', 'color-aqui');
});
$('#myModal').on('hide.bs.modal', function () {
    $('#miBoton').prop('disabled', false);
    $('#miBoton').css('background-color', 'color-original');
});