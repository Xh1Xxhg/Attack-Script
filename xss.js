window.addEventListener('message', function (e) {
    console.log('%c' + h(e.source) + '%c��%c' + h() + ' %c' + (typeof e.data
        == 'string' ? e.data : 'j ' + JSON.stringify(e.data)), "color: red", '', "color: green", '');
})


