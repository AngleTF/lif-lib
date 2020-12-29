(function () {
    function Adaptive () {
        document.documentElement.style.fontSize = window.innerWidth / 10 + 'px';
    }

    addEventListener('resize', Adaptive);
    Adaptive();
})();
