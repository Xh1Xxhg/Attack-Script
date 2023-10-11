window.addEventListener('message', function (e) {
    console.log('%c' + h(e.source) + '%c¡ú%c' + h() + ' %c' + (typeof e.data
        == 'string' ? e.data : 'j ' + JSON.stringify(e.data)), "color: red", '', "color: green", '');
})


