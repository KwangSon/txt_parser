var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
document.head.appendChild(script);
script.onload = function () {
    // jQuery가 로드된 후 실행할 코드
    console.log('jQuery가 로드되었습니다!');
};


function downloadTextFile(filename, data) {

    var blob = new Blob([data], { type: 'text/json' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

function doSinglePage(url) {
    setTimeout(function () {
        console.log('gets printed only once after 1 seconds')
        fetch(url).then(r => r.text()).then(result => {
            var parser = new DOMParser();

            var DomObject = parser.parseFromString(result, "text/html");

            bookname = DomObject.querySelector("title").textContent;
            content = DomObject.querySelector('#novel_content');
            // TODO content parse
            // downloadTextFile(bookname, content);
        })
    }, 1000);
}

pages = $('.list-body .item-subject');



pages.each(function () {
    const itemSubject = $(this);
    const href = itemSubject.attr('href');
    console.log(href);
    return;
});
